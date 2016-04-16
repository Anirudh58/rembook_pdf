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

def mail(to, attach):
	gmail_user = "anirudh.jan97@gmail.com"
	gmail_pwd = "Cannot be hacked"
	msg = MIMEMultipart()

	msg['From'] = gmail_user
	msg['To'] = to
	msg['Subject'] = "REMBOOK_PDF"

	text = "A copy of your rembook is attached below :) "
	msg.attach(MIMEText(text))

	part = MIMEBase('application', 'octet-stream')
	part.set_payload(open(attach, 'rb').read())
	Encoders.encode_base64(part)
	part.add_header('Content-Disposition','attachment; filename="%s"' % os.path.basename(attach))
	msg.attach(part)

	mailServer = smtplib.SMTP("smtp.gmail.com", 587)
	mailServer.ehlo()
	mailServer.starttls()
	mailServer.ehlo()
	mailServer.login(gmail_user, gmail_pwd)
	mailServer.sendmail(gmail_user, to, msg.as_string())
	mailServer.close()
 
 
def execute(script, args):
		  browser.execute('executePhantomScript', {'script': script, 'args' : args })

with open("output") as file:
	for line in file:
		roll_no =  line.split(",")[0]
		email = line.split(",")[1]
		email = email[1:-2]
		print roll_no
		print email
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
		mail(str(email), pdfname)