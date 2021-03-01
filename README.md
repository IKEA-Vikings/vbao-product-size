# Vikea

> A mock-up of Ikea's item details page. This repo is a module of the "Product Size" section.

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
1. [Measurements](#measurements)

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
**Functionality** | Retrieves product's sizes.
**Endpoint/Path** | `api/sizes/:id`
**Verb**          | GET

### Request/Response

```javascript
/* Sample Request */
$.get('api/sizes/1', (data) => { ... });

/* Sample Response */
{
  _id: 1,
  sizes: [
    {
      name: 'Height',
      size: '45',
      measurement: 'in'
    },
    {
      name: 'Width',
      size: '25',
      measurement: 'in'
    },
    {
      name: 'Max. load',
      size: '200',
      measurement: 'lb'
    }
  ]
}
```

## Database

Schema utilizing mongoDB via Mongoose

```javascript
import mongoose from 'mongoose';
const { Schema } = mongoose;

const singleSize = new Schema({
  name: String,
  size: String,
  measurement: String
});

const productSizes = new Schema({
  sizes: {
    type: [singleSize],
    default: undefined
  }
});
```

### Measurements

A list of expected measurement conventions.

**Example of default size names:**

- height
- width
- diameter
- length
- depth
- thickness
- filling weight
- thread count
- cord length
- max. load
- height of a drawer (inside)
- drawer width (inside)
- drawer depth (inside)
- headboard height
- footboard height
- mattress length
- mattress width

**Example of custom size names:**

- max. load/shelf
- max. load/bed height
- height under loft bed

**Example of default measurements:**

- in
- ft
- /inch2
- lb
- oz
