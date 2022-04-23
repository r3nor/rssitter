# RSSITTER
> Twitter via RSS with privacy

Rssitter allows you to follow your favourite twitters without Twitter even knowing it. Rssitter uses [Nitter's](nitter.net) rss feed in order to gather the latest tweets from your favourite accounts and builds a *twitter-like* feed so you can read them. We will never connect you to Twitter so your privacy is safe using Rssitter.

At the moment, *rssitter* is **serverless** but I'm working on a *flask* implementation so you can follow your accounts and have a user. At the moment the best way to use it is to download the two files and use it locally.

## Use it with 5 simple steps.
1. Download or clone this repo.
2. Open `js/fetch.js` with your favourite editor.
3. Enter your favourite rss feeds to the `rss_list` variable.
4. Open `index.html` with your browser.
5. Enjoy


## FUTURE: NOT YET IMPLEMENTED
I will be using Flask for the server. It is lightweight and I'm able to use Python, a pl wich I am much more familiarized.

### Self hosting
1. Install `python3`, `pip` and `virtualenv`.
2. Prepare a virtual environment:
    - `python3 -m venv venv`
    - `source venv/bin/activate`
  > Now you are inside of the virtual environment for python.
3. [env] Update pip
    - `pip install --upgrade pip`
4. [env] Install the dependencies:
    - `pip3 install flask flask-sqlalchemy flask-migrate python-dotenv flask-wtf flask-login email-validator feedparser`
    > It may require you to use *sudo*
5. [env] Initialize and prepare the database.
    - `flask db init`
    - `flask db migrate`
    - `flask db upgrade`
6. [env] Run the application.
    - `flask run`
7. Go to "http://localhost:5000/" and enjoy.
