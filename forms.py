from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, Length

class InputForm(FlaskForm):
    epd_name = StringField(
        'If your promoter exists in the EPD database, please enter the promoter name from EPD: ',
        
    )

    nucleotide = StringField(
        "Don't know EPD name? Enter 60 nucleotide sequence: ",
        [Length(max=60, message=('Incorrect Sequence!'))]
    )

    submit = SubmitField('Submit')