from flask import (Flask, url_for,
    render_template,
    redirect)
from forms import InputForm
from terminal_app import do_stuff


app = Flask(__name__)
app.config['SECRET_KEY'] = 'SECRET_KEY'

@app.route("/", methods=['GET','POST'])
def index():
    form = InputForm()
    if form.validate_on_submit():
        if (form.epd_name.data):
            data = form.epd_name.data
            results = do_stuff('y', data.upper())
        elif(form.nucleotide.data):
            data = form.nucleotide.data
            results = do_stuff('n', data.upper())
        return render_template(
            "result.html",
            form=form,
            data=data,
            results=results)
    return render_template(
        "index.html",
        form=form)

@app.route("/result", methods=['GET','POST'])
def result():
    form = InputForm()
    if form.validate_on_submit():
        if (form.epd_name.data):
            data = form.epd_name.data
            results = do_stuff('y', data.upper())
        elif(form.nucleotide.data):
            data = form.nucleotide.data
            results = do_stuff('n', data.upper())
        return render_template(
            "result.html",
            form=form,
            results=results)
    return render_template(
        "index.html",
        form=form)