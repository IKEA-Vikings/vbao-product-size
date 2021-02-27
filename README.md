# Vikea

> A mock-up of Ikea's item details page. This repo is a module of the "Similar Products" section.

## Related Projects

  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo

## Table of Contents

1. [Usage](#usage)
1. [Requirements](#requirements)
1. [Development](#development)
1. [API](#api)
1. [Database](#database)

## Usage

> Some usage instructions

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

## API

API               | Description
------------------|----------------------------------------------
**Functionality** | Retrieves product's category and subcategory.
**Endpoint/Path** | `/type/:id`
**Verb**          | GET

### Request/Response

```javascript
/* Sample Request */
$.get('/type/1', (data) => { ... });

/* Sample Response */
{
  id: 1,
  category: 'Lighting',
  subcategory: 'Lamp Shades'
}
```

## Database

Schema utilizing mySQL

**Table:** product_type
field       | type | null | key      | default
------------|------|------|----------|--------
id          | INT  | NO   | PRIMARY  |
category    | INT  | YES  | MULTIPLE | NULL
subcategory | INT  | YES  | MULTIPLE | NULL

**Table:** category
field | type        | null | key     | default
------|-------------|------|---------|--------
id    | INT         | NO   | PRIMARY |
name  | VARCHAR(25) | YES  |         | NULL

**Table:** subcategory
field    | type        | null | key      | default
---------|-------------|------|----------|--------
id       | INT         | NO   | PRIMARY  |
name     | VARCHAR(25) | YES  |          | NULL
category | ID          | YES  | MULTIPLE | NULL
