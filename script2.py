#!/usr/bin/env python
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from email.MIMEMultipart import MIMEMultipart
from email.MIMEBase import MIMEBase
from email.MIMEText import MIMEText
from email import Encoders
import os
import time
import smtplib
import mandrill
import base64
import subprocess

def mail(to, attach, name):
	file = open(attach)
	encoded = base64.b64encode(file.read())
	file.close()

	try:
		mandrill_client = mandrill.Mandrill('k2ITAgHQ9Aa5itTB49sScQ')
		message = {
			'to': [{'email': to,
					'type': 'to'}],
			'merge_vars': [{'rcpt': to}],
			'tags': ['rembook'],
			'from_email': 'contact@deltaforce.club',
			'from_name': 'Delta Force',
			'html': "<p> Dear " + name + ", <br> It's been almost a year since you graduated from NITT, a year without Festember, Pragyan, and NITTFEST. A year removed from dinner at D2, coffee at Staff C, and of course, the scorching heat. While you may have reminisced about these and other wonderful memories from a simpler time, know that we at NITT have missed you more than you can imagine. Even though you've graduated, know that you will always make NITT proud, wherever you are in the world. So while you make big decisions in both life and business, here's a little bit of magic from back home in Trichy :) <br><br> Delta Force </p>",
			'subject': 'Rembook pdf',
			'attachments': [{'content': encoded,
							'name': attach,
							'type': 'application/pdf'}]
		}
		result = mandrill_client.messages.send(message=message, async=False, ip_pool='Main Pool')
	except mandrill.Error, e:
		print 'A mandrill error occurred: %s - %s' % (e.__class__. e)
		raise
		

def compress(file):
	print 'compressing ' + file
	arg1= '-sOutputFile=' +"v"+ file
	p = subprocess.Popen(['/usr/bin/gs', '-sDEVICE=pdfwrite', '-dCompatibilityLevel=1.4', '-dPDFSETTINGS=/screen', '-dNOPAUSE', '-dBATCH',  '-dQUIET', str(arg1), file], stdout=subprocess.PIPE)
	print (p.communicate())
 
def execute(script, args):
		  browser.execute('executePhantomScript', {'script': script, 'args' : args })

with open("input.txt") as file:
	for line in file:
		roll_no =  line.split(",")[0]
		email = line.split(",")[1]
		name = line.split(",")[2]
		print roll_no
		print email
		print name
		browser = webdriver.PhantomJS()
		browser.set_window_size(1124,850)
		browser.command_executor._commands['executePhantomScript'] = ('POST','/session/$sessionId/phantom/execute')
		browser.get('http://localhost:3000/')
		browser.find_element_by_id('idbox').send_keys(roll_no)
		browser.find_element_by_id('submit').click()
		time.sleep(5)
		pageFormat = '''this.paperSize = {format: "A4", orientation: "portrait" };'''
		execute(pageFormat, [])
		pdfname = roll_no + ".pdf"
		render = '''this.render("%s")''' % pdfname
		execute(render, [])
		compress(pdfname)
		pdfname = "v"+pdfname
		mail(str(email), pdfname, name)