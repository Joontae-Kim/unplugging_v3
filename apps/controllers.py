# -*- coding: utf-8 -*-
from flask import render_template
from flask import Flask, request, send_from_directory
from apps import app

@app.route('/')
@app.route('/index')
def index():
    return render_template("home.html")

@app.route('/about')
def about():
    return render_template("about.html")

@app.route('/membership')
def membership():
    return render_template("membership.html")

@app.route('/passwordreset')
def passwordreset():
    return render_template("password-reissue.html")

@app.route('/simpleCalculates')
def simpleCalculates():
    return render_template("simple_Calculates.html")

@app.route('/calculates')
def calculates():
    return render_template("caltype.html")

@app.route('/result')
def result():
    return render_template("result.html")

@app.route('/robots.txt')
@app.route('/sitemap.xml')
def static_from_root():
 	return send_from_directory(app.static_folder, request.path[1:])

# @app.route('/naver0af7a871897d85a069d811be73491d0c.html')

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')