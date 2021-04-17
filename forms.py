from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, Length, Optional, AnyOf, Regexp, ValidationError

def validate_chars(form, field):
    allowed_chars = 'CGATUcgatu'
    if not set(field.data).issubset(allowed_chars):
        raise ValidationError('Sequence has foreign characters!')

class InputForm(FlaskForm):
    epd_name = StringField(
        'Please enter the promoter name from EPD ',
        [Optional(),
        AnyOf(values=['TDH3_1', 'CCW12_1', 'PGK1_1', 'HHF2_1', 'TEF1_1', 'TEF2_1', 'HHF1_1', 'HTB2_1', 'RPL18B_1', 'ALD6_1', 'PAB1_1',
	                'RET2_1', 'RNR1_1', 'SAC6_1', 'RNR2_1', 'POP6_1', 'RAD27_1', 'PSP2_1','tdh3_1', 'ccw12_1', 'pgk1_1', 'hhf2_1', 'tef1_1', 'tef2_1', 'hhf1_1', 'htb2_1', 'rpl18b_1', 'ald6_1', 'pab1_1',
	                'ret2_1', 'rnr1_1', 'sac6_1', 'rnr2_1', 'pop6_1', 'rad27_1', 'psp2_1'], message='Incorrect EPD name!'),
        ]
    )

    nucleotide = StringField(
        "Please enter the 60 nucleotide sequence ",
        [Optional(),
        Length(min=60, max=60, message=('Incorrect Sequence!')),
        validate_chars])


    submit = SubmitField('Submit')