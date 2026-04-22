# ◈ Laboration 2 API
Detta repository innehåller ett API för laboration 2 i kursen DT207G.

API:et hanterar olika jobberfarenheter för att skapa ett digitalt CV. CRUD (Create, Read, Update, Delete) funktionalitet är implementerat.

## ⬀ Länk till API
API:et finns tillgängligt på följande URL: [https://api.clr-server.com/employments](https://api.clr-server.com/employments)

## ✦ Databas och Tabeller
Detta API använder en SQLite-databas.

### 1. Employments:
| Attribut | Data |
| :--- | :--- |
| id | INTEGER PRIMARY KEY AUTOINCREMENT |
| company_name | TEXT NOT NULL |
| job_title | TEXT NOT NULL |
| location | TEXT NOT NULL |
| start_date | DATE NOT NULL |
| end_date | DATE DEFAULT NULL |
| description | TEXT DEFAULT 'Ingen beskrivning tillgänglig' |

## ⚙ Användning
| Metod | Ändpunkt | Beskrivning |
| :--- | :--- | :--- |
| GET | `/employments` | Hämtar alla jobberfarenheter. |
| GET | `/employments/:ID` | Hämtar en specifik jobberfarenhet med angivet ID. |
| POST | `/employments` | Lagrar en ny jobberfarenhet i databasen. Ett objekt med jobb-data måste skicaks med i anropet. |
| PUT | `/employments/:ID` | Uppdaterar en existerande jobberfarenhet i databasen. Ett objekt med jobb-data måste skicaks med i anropet. |
| DELETE | `/employments/:ID` | Raderar en jobberfarenhet med angivet ID. |

Följande jobberfarenhets-objekt returneras vid lyckat get-anrop i JSON-format.
```bash
{
    "id": 1,
    "company_name": "Företagsnamn",
    "job_title": "Roll",
    "location": "Arbetets plats",
    "start_date": "2000-01-01",
    "end_date": null,
    "description": "Mina arbetsuppgifter var..."
  }
```


## ⬢ Utvecklare
**Ludvig Rosenqvist** — *Student*
🔗 [GitHub](https://github.com/CLR2001)
