define({ "api": [  {    "type": "get",    "url": "/barcode/:code",    "title": "Get Barcode Item Name",    "group": "Barcode",    "parameter": {      "fields": {        "required": [          {            "group": "required",            "type": "String",            "optional": false,            "field": "code",            "description": "<p>the barcode</p>"          }        ]      }    },    "version": "0.0.0",    "filename": "src/routes/barcode.js",    "groupTitle": "Barcode",    "name": "GetBarcodeCode"  },  {    "type": "post",    "url": "/device",    "title": "Create Device",    "group": "Device",    "description": "<p>stubbed for now</p>",    "version": "0.0.0",    "filename": "src/routes/device.js",    "groupTitle": "Device",    "name": "PostDevice"  },  {    "type": "delete",    "url": "/:deviceId/inventory/:itemId",    "title": "Delete Item",    "group": "Inventory",    "parameter": {      "fields": {        "required": [          {            "group": "required",            "type": "String",            "optional": false,            "field": "deviceId",            "description": "<p>pass any string for now</p>"          },          {            "group": "required",            "type": "String",            "optional": false,            "field": "itemId",            "description": "<p>inventory item unique id</p>"          }        ]      }    },    "success": {      "examples": [        {          "title": "Success-Response: all items in inventory",          "content": "[\n\t{\n\t\ttitle: 'apple',\n\t\tquantity: 2,\n\t\t...\n\t}\n\t...\n]",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "src/routes/inventory.js",    "groupTitle": "Inventory",    "name": "DeleteDeviceidInventoryItemid"  },  {    "type": "get",    "url": "/:deviceId/inventory",    "title": "Get All Inventory For Device",    "group": "Inventory",    "parameter": {      "fields": {        "required": [          {            "group": "required",            "type": "String",            "optional": false,            "field": "deviceId",            "description": "<p>pass any string for now</p>"          }        ]      }    },    "success": {      "examples": [        {          "title": "Success-Response: all items in inventory",          "content": "[\n\t{\n\t\ttitle: 'apple',\n\t\tquantity: 2,\n\t\t...\n\t}\n\t...\n]",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "src/routes/inventory.js",    "groupTitle": "Inventory",    "name": "GetDeviceidInventory"  },  {    "type": "get",    "url": "/:deviceId/inventory/:itemId",    "title": "Get Single Item",    "group": "Inventory",    "parameter": {      "fields": {        "required": [          {            "group": "required",            "type": "String",            "optional": false,            "field": "deviceId",            "description": "<p>pass any string for now</p>"          },          {            "group": "required",            "type": "String",            "optional": false,            "field": "itemId",            "description": "<p>inventory item unique id</p>"          }        ]      }    },    "success": {      "examples": [        {          "title": "Success-Response: item requested",          "content": "{\n\ttitle: 'apple',\n\tquantity: 2,\n\t...\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "src/routes/inventory.js",    "groupTitle": "Inventory",    "name": "GetDeviceidInventoryItemid"  },  {    "type": "put",    "url": "/:deviceId/inventory",    "title": "Add Item To Inventory",    "group": "Inventory",    "parameter": {      "fields": {        "required": [          {            "group": "required",            "type": "String",            "optional": false,            "field": "deviceId",            "description": "<p>pass any string for now</p>"          }        ],        "body": [          {            "group": "body",            "type": "Object",            "optional": false,            "field": "item",            "description": "<p>item to add to the inventory</p>"          }        ]      },      "examples": [        {          "title": "Request-Body-Example:",          "content": "{\n\ttitle: 'apple',\n\tquantity: 2,\n\tunits: 'whole',\n\ttimeAdded: 1487568006,\n\ttimeExpired: 1487742114\n}",          "type": "json"        }      ]    },    "success": {      "examples": [        {          "title": "Success-Response: all items in inventory",          "content": "[\n\t{\n\t\ttitle: 'apple',\n\t\tquantity: 2,\n\t\t...\n\t}\n\t...\n]",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "src/routes/inventory.js",    "groupTitle": "Inventory",    "name": "PutDeviceidInventory"  },  {    "type": "put",    "url": "/:deviceId/inventory/:itemId",    "title": "Modify Item In Inventory",    "group": "Inventory",    "parameter": {      "fields": {        "required": [          {            "group": "required",            "type": "String",            "optional": false,            "field": "deviceId",            "description": "<p>pass any string for now</p>"          },          {            "group": "required",            "type": "String",            "optional": false,            "field": "itemId",            "description": "<p>inventory item unique id to modify</p>"          }        ],        "body": [          {            "group": "body",            "type": "Object",            "optional": false,            "field": "item",            "description": "<p>fields of item to update</p>"          }        ]      }    },    "success": {      "examples": [        {          "title": "Success-Response: all items in inventory",          "content": "[\n\t{\n\t\ttitle: 'apple',\n\t\tquantity: 2,\n\t\t...\n\t}\n\t...\n]",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "src/routes/inventory.js",    "groupTitle": "Inventory",    "name": "PutDeviceidInventoryItemid"  },  {    "type": "get",    "url": "/recipes",    "title": "Generic Request Recipes",    "group": "Recipes",    "parameter": {      "fields": {        "required": [          {            "group": "required",            "type": "String",            "optional": false,            "field": "ingredients",            "description": "<p>comma seperated list of food item names</p>"          }        ],        "optional": [          {            "group": "optional",            "type": "String",            "optional": false,            "field": "cuisine",            "description": "<p>one of the following: african, chinese, japanese, korean, vietnamese, thai, indian, british, irish, french, italian, mexican, spanish, middle eastern, jewish, american, cajun, southern, greek, german, nordic, eastern european, caribbean, or latin american</p>"          },          {            "group": "optional",            "type": "String",            "optional": false,            "field": "intolerances",            "description": "<p>one or more of the following comma seperated: dairy, egg, gluten, peanut, sesame, seafood, shellfish, soy, sulfite, tree nut, and wheat</p>"          },          {            "group": "optional",            "type": "String",            "optional": false,            "field": "query",            "description": "<p>general recipe search string, ex: hamburger</p>"          },          {            "group": "optional",            "type": "Number",            "optional": false,            "field": "page",            "description": "<p>next 10 results</p>"          },          {            "group": "optional",            "type": "String",            "optional": false,            "field": "type",            "description": "<p>one of the following: main course, side dish, dessert, appetizer, salad, bread, breakfast, soup, beverage, sauce, or drink</p>"          }        ]      }    },    "examples": [      {        "title": "Example usage:",        "content": "curl http://food-fit.herokuapp.com/recipes?ingredients=tomato%2Clettuce%2Cchedder+cheese&intolerances=peanut&page=2",        "type": "curl"      }    ],    "success": {      "examples": [        {          "title": "Success-Response: ",          "content": "{\t\t\n\tdata: [\n\t\t{\n\t\t\ttitle: 'Zesty Tomato Sauce',\n\t\t\timage: 'https://spoonacular.com/recipeImages/zesty-tomato-sauce-268411.jpg',\n\t\t\tsteps: ['Fill pan with water', ...]\n\t\t}\n\t\t...\n\t],\n\ttotalPages: 90,\n\tpage: 2\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "src/routes/recipes.js",    "groupTitle": "Recipes",    "name": "GetRecipes"  },  {    "type": "get",    "url": "/:userId/recipes",    "title": "Request Recipes For User",    "group": "Recipes",    "parameter": {      "fields": {        "required": [          {            "group": "required",            "type": "Number",            "optional": false,            "field": "userId",            "description": "<p>user requesting recipes (for now use id: 1)</p>"          }        ],        "optional": [          {            "group": "optional",            "type": "String",            "optional": false,            "field": "cuisine",            "description": "<p>one of the following: african, chinese, japanese, korean, vietnamese, thai, indian, british, irish, french, italian, mexican, spanish, middle eastern, jewish, american, cajun, southern, greek, german, nordic, eastern european, caribbean, or latin american</p>"          },          {            "group": "optional",            "type": "String",            "optional": false,            "field": "intolerances",            "description": "<p>one or more of the following comma seperated: dairy, egg, gluten, peanut, sesame, seafood, shellfish, soy, sulfite, tree nut, and wheat</p>"          },          {            "group": "optional",            "type": "String",            "optional": false,            "field": "query",            "description": "<p>general recipe search string, ex: hamburger</p>"          },          {            "group": "optional",            "type": "Number",            "optional": false,            "field": "page",            "description": "<p>next 10 results</p>"          },          {            "group": "optional",            "type": "String",            "optional": false,            "field": "type",            "description": "<p>one of the following: main course, side dish, dessert, appetizer, salad, bread, breakfast, soup, beverage, sauce, or drink</p>"          }        ]      }    },    "examples": [      {        "title": "Example usage:",        "content": "curl http://food-fit.herokuapp.com/1/recipes?page=2",        "type": "curl"      }    ],    "success": {      "examples": [        {          "title": "Success-Response: ",          "content": "\n{\t\t\n\tdata: [\n\t\t{\n\t\t\ttitle: 'Zesty Tomato Sauce',\n\t\t\timage: 'https://spoonacular.com/recipeImages/zesty-tomato-sauce-268411.jpg',\n\t\t\tsteps: ['Fill pan with water', ...]\n\t\t}\n\t\t...\n\t],\n\ttotalPages: 90,\n\tpage: 2\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "src/routes/recipes.js",    "groupTitle": "Recipes",    "name": "GetUseridRecipes"  },  {    "type": "post",    "url": "/speech",    "title": "Parse Speech File",    "group": "Speech",    "parameter": {      "fields": {        "body": [          {            "group": "body",            "type": "Binary",            "optional": false,            "field": "file",            "description": "<p>raw audio file</p>"          }        ]      }    },    "examples": [      {        "title": "Example usage:",        "content": "curl -X POST --data-binary @\"bridge.raw\" -H \"Content-Type: audio/wav\" localhost:8080/speech",        "type": "curl"      }    ],    "version": "0.0.0",    "filename": "src/routes/speech.js",    "groupTitle": "Speech",    "name": "PostSpeech"  },  {    "type": "post",    "url": "/user",    "title": "Create User",    "group": "User",    "description": "<p>stubbed for now</p>",    "version": "0.0.0",    "filename": "src/routes/user.js",    "groupTitle": "User",    "name": "PostUser"  }] });
