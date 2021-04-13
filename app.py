from flask import (Flask, url_for,
    render_template,
    redirect)
from forms import InputForm

app = Flask(__name__)
app.config['SECRET_KEY'] = 'SECRET_KEY'

@app.route("/", methods=['GET','POST'])
def index():
    form = InputForm()
    if form.validate_on_submit():
        return "Success"
    return render_template(
        "index.html",
        form=form)