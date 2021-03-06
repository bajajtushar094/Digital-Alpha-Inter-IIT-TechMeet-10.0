<h2 align="center">DIGITAL ALPHA'S SEC FILING ANALYZER FOR SAAS COMPANIES</h2>
<h4 align="left">SEC Filings have always been a huge source of information for investors. We are trying to automate and analyze filings and generate insights in context of SAAS companies</h4>

**A React-Django Based ML Web App**  

-------

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
|── analytics/
|   |──given data/
|   |──source code/
|   |  |__ python source code files for edgar scraping/
|   |  |__ python source code files for metrics calculations/
|   |  |__ python source code files for miscellaneous work/
|   |  |__ python source code files for outside sources scraping/
|   |  |__ python source code files for text analysis - NLP/
|   |
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


 ### Steps To Extract Raw Edgar Filings in Analytics
 1. Move to backend folder
 2. Move into analytics folder
 3. Move into analytics folder
 4. Move into folder python source code files for edgar scraping
 5. Move into folder directory_for_scraping_edgar_metadata
 6. Install dependencies via `pip install -r requirements.txt`
 7. Before running any script, you can edit the `config.json` file to adjust parameters.
 8. To download financial reports from EDGAR, run `python edgar_crawler.py
 9. To clean and extract specific item sections from already-downloaded 10-K documents, run `python extract_items.py`.
 Note : All folders in analytics folder are named according to the python files they contain.




> The model will be served on **http://localhost:8000/**