[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/MLH-Fellowship/Auto-Tagger.svg)](https://github.com/bajajtushar094/Digital-Alpha-Inter-IIT-TechMeet-10.0/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/MLH-Fellowship/Auto-Tagger.svg)](https://github.com/bajajtushar094/Digital-Alpha-Inter-IIT-TechMeet-10.0/pulls)

<h2 align="center">DIGITAL ALPHA'S SEC FILING ANALYZER FOR SAAS COMPANIES</h2>
<h4 align="left">SEC Filings have always been a huge source of information for investors. We are trying to automate and analyze filings and generate insights in context of SAAS companies</h4>
**A React-Django Based ML Web App**  -----
### Prerequisites

1.  [Git](https://git-scm.com/downloads).
2.  [Node & npm](https://nodejs.org/en/download/) _(version 12 or greater)_.
3.  A fork of the repo.
4. Python3 environment to install Django and its dependencies
5. [PyTorch](https://pytorch.org/)

### Directory Structure

The following is a high-level overview of relevant files and folders.

```
backend/
├── dashboard_apis/
│   ├── core/
│   ├── dashboard_apis/
|   ├── dataentry.py
|   ├── dbsqlite3
|   ├── manage.py
|   └── requirements.txt
└── frontend/
    ├── public/
    │   ├── index.html
    │   └── ...
    ├── src/
    │   ├── actions/
    │   │   ├── actions.js
    │   ├── Components/
    │   │   ├── Global 
    │   │   └── Widgets
    │   ├── constants/
    │   ├── fonts/
    │   ├── constants/
    │   ├── images/
    │   ├── Pages/
    |       ├── BasketList/
    |       ├── Company/
    |       ├── Error404/
    |       ├── Filenew/
    |       ├── Files/
    |       ├── IndividualBasket/
    |       ├── Landing/
    |       ├── RecentlyViewed/
    |       └── Search/
    |   ├── reducers/
    |   ├── utils/
    |   ├── App.js
    |   ├── config.js
    |   ├── global.scss
    |   ├── index.js
    |   ├── registerServiceWorker.js
    |   └── store.js
    ├── package-lock.json
    ├── package.json
    ├── README.md
    ├── yarn.lock
    └── .gitignore
       
```

## Installation

### Clone

- Clone this repo to your local machine using `https://github.com/bajajtushar094/Digital-Alpha-Inter-IIT-TechMeet-10.0/`

### Steps to run backend

In order to install all packages follow the steps below:

 1. Move to backend folder
 2. Then move into the dashboard_apis folder
 3. For installing virtual environment - `python3 -m pip install --user virtualenv`
 4. Create A Virtual env - `python3 -m venv env`
 5. Activate virtual env - `source env/bin/activate`
 6. `pip3 install -r requirements.txt`
 7. `python manage.py runserver localhost:8000`

### Steps To Set Up Frontend
 1. Move to frontend folder
 2. Move into dashboard_frontend
 3. `npm install`
 4. `npm start`



> The model will be served on **http://localhost:8000/**
