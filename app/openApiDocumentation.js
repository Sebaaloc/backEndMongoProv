exports.swaggerDocument = 
{
    "swagger":"2.0",
    "info":{
       "description":"This is a simple CRUD for MongoDB using Node.js, express and ORM Mongoose it queries, inserts, updates and deletes records in two MongoDB collections called providers and specialties.",
       "version":"1.0.0",
       "title":"Mongo Crud"
    },
    "basePath":"",
    "tags":[
       {
          "name":"providers"
       },
       {
          "name":"specialties"
       }
    ],
    "paths":{
       "/providers":{
          "get":{
             "tags":[
                "providers"
             ],
             "summary":"Get method for providers.",
             "description":"Returns data of all providers of services or a single provider if the user inputs query params.",
             "operationId":"providersGet",
             "parameters":[
                {
                   "name":"name",
                   "in":"query",
                   "required":false,
                   "description":"Optional name of provider to search.",
                   "type":"string"
                },
                {
                   "name":"mname",
                   "in":"query",
                   "required":false,
                   "description":"Optional middle name of provider to search.",
                   "type":"string"
                },
                {
                   "name":"mail",
                   "in":"query",
                   "required":false,
                   "description":"Optional mail of provider to search.",
                   "type":"string"
                }
             ],
             "responses":{
                "200":{
                   "description":"Found provider(s).",
                   "schema":{
                      "$ref":"#/definitions/providersFound"
                   }
                },
                "404":{
                   "description":"Didn't find providers.",
                   "schema":{
                      "$ref":"#/definitions/providersNotFound"
                   }
                }
             }
          }
       },
       "/specialties":{
          "get":{
             "tags":[
                "specialties"
             ],
             "summary":"Get method for specialties.",
             "description":"Returns data of all specialties of providers or a single specialty if the user inputs query params.",
             "operationId":"specialtiesGet",
             "parameters":[
                {
                   "name":"name",
                   "in":"query",
                   "required":false,
                   "description":"Optional name of specialty to search.",
                   "type":"string"
                },
                {
                   "createdBy":"mname",
                   "in":"query",
                   "required":false,
                   "description":"Optional ID of who created the specialty.",
                   "type":"number"
                },
                {
                   "name":"createdAt",
                   "in":"query",
                   "required":false,
                   "description":"Optional date of when was the specialty created.",
                   "type":"string"
                },
                {
                   "name":"updatedBy",
                   "in":"query",
                   "required":false,
                   "description":"Optional ID of who created the specialty.",
                   "type":"number"
                },
                {
                   "name":"updatedAt",
                   "in":"query",
                   "required":false,
                   "description":"Optional date of when was the specialty updated.",
                   "type":"string"
                }
             ],
             "responses":{
                "200":{
                   "description":"Found specialty(ies).",
                   "schema":{
                      "$ref":"#/definitions/specialtyFound"
                   }
                },
                "404":{
                   "description":"Didn't find specialties.",
                   "schema":{
                      "$ref":"#/definitions/specialtyNotFound"
                   }
                }
             }
          }
       },
       "/providersInsert": {
        "post":{
            "tags":[
               "specialties"
            ],
            "summary":"Inserts providers",
            "description":"Inserts data of service providers on MongoDB collection providers.",
            "operationId":"insertProvider",
            "parameters":[
               {
                  "in":"body",
                  "name":"body",
                  "description":"Configuration for building the client library",
                  "required":true,
                  "schema":{
                     "$ref":"#/definitions/providersInsert"
                  }
               }
            ],
            "responses":{
               "200":{
                  "description":"Provider created.",
                  "schema":{
                     "$ref":"#/definitions/providerInserted"
                  }
               },
               "400":{
                "description":"Missing arguments for provider.",
                "schema":{
                   "$ref":"#/definitions/providerMissingArgs"
                }
             },
             "400 ":{
                "description":"Could not insert provider.",
                "schema":{
                   "$ref":"#/definitions/providerNotInserted"
                }
             }
            }
         }
       }
    },
    "definitions":{
       "providersNotFound":{
          "type":"object",
          "properties":{
             "message":{
                "type":"string",
                "example":"Err: Provider not found."
             },
             "internal_code":{
                "type":"string",
                "example":"NOT_FOUND"
             }
          }
       },
       "providersFound":{
          "type":"array",
          "items":{
             "type":"object",
             "properties":{
                "firstName":{
                   "type":"string"
                },
                "lastName":{
                   "type":"string"
                },
                "middleName":{
                   "type":"string"
                },
                "email":{
                   "type":"string"
                },
                "projectedStartDate":{
                   "type":"string"
                },
                "employerId":{
                   "type":"string"
                },
                "providerType":{
                   "type":"string"
                },
                "staffStatus":{
                   "type":"string"
                },
                "assignedTo":{
                   "type":"number"
                },
                "status":{
                   "type":"string"
                },
                "createdBy":{
                   "type":"number"
                },
                "createdAt":{
                   "type":"string"
                },
                "updatedBy":{
                   "type":"number"
                },
                "updatedAt":{
                   "type":"string"
                },
                "specialty":{
                   "type":"object",
                   "properties":{
                      "status":{
                         "_id":"string"
                      },
                      "name":{
                         "type":"number"
                      },
                      "createdBy":{
                         "type":"number"
                      },
                      "createdAt":{
                         "type":"string"
                      },
                      "updatedBy":{
                         "type":"number"
                      },
                      "updatedAt":{
                         "type":"string"
                      }
                   }
                }
             }
          }
       },
       "providersInsert":{   
           "type":"object",
           "properties":{
              "firstName":{
                 "type":"string",
                 "example": "Jhon"
              },
              "lastName":{
                 "type":"string",
                 "example": "Jaramillo"
              },
              "middleName":{
                 "type":"string",
                 "example": ""
              },
              "email":{
                 "type":"string",
                 "example": "jhonJ@gmail.com"
              },
              "projectedStartDate":{
                 "type":"string",
                 "example": "Tue Mar 14 2017 15:14:05 GMT-0500 (GMT-05:00)"
              },
              "employerId":{
                 "type":"string",
                 "example": "318"
              },
              "providerType":{
                 "type":"string",
                 "example": "DO"
              },
              "staffStatus":{
                 "type":"string",
                 "example": "ACTIVE"
              },
              "assignedTo":{
                 "type":"number",
                 "example": 87001
              },
              "status":{
                 "type":"string",
                 "example": "DENIED"
              },
              "createdBy":{
                 "type":"number",
                 "example": 21560
              },
              "createdAt":{
                 "type":"string",
                 "example": "Wed May 03 2017 22:19:51 GMT-0500 (GMT-05:00)"
              },
              "updatedBy":{
                 "type":"number",
                 "example": 55303
              },
              "updatedAt":{
                 "type":"string",
                 "example": "Mon Sep 11 2017 20:36:48 GMT-0500 (GMT-05:00)"
              },
              "specialty":{
                 "type":"object",
                 "properties":{
                    "status":{
                       "_id":"string",
                       "example": "59b84f14cab3a5b9d262979d"
                    },
                    "name":{
                       "type":"number",
                       "example": "Developer"
                    },
                    "createdBy":{
                       "type":"number",
                       "example": 66674
                    },
                    "createdAt":{
                       "type":"string",
                       "example": "Wed Mar 08 2017 03:45:08 GMT-0500 (GMT-05:00)"
                    },
                    "updatedBy":{
                       "type":"number",
                       "example": 44861
                    },
                    "updatedAt":{
                       "type":"string",
                       "example": "Mon Sep 11 2017 22:49:29 GMT-0500 (GMT-05:00)"
                    }
                 }
              }
           }
        
     },
     "providerInserted":{
           "type":"object",
           "properties":{
              "message":{
                 "type":"string",
                 "example": "Provider created."
              }
            }
        
    },
    "providerMissingArgs":{
        "type":"object",
        "properties":{
           "message":{
              "type":"string",
              "example":"Err: Missing input parameters."
           },
           "internal_code":{
              "type":"string",
              "example":"BAD_REQUEST"
           }
        }
     },
     "providerNotInserted":{
        "type":"object",
        "properties":{
           "message":{
              "type":"string",
              "example":"Err: Provider not created in MongoDB."
           },
           "internal_code":{
              "type":"string",
              "example":"BAD_REQUEST"
           }
        }
     },
       "specialtyNotFound":{
          "type":"object",
          "properties":{
             "message":{
                "type":"string",
                "example":"Err: Specialty of provider not found."
             },
             "internal_code":{
                "type":"string",
                "example":"NOT_FOUND"
             }
          }
       },
       "specialtyFound":{
          "type":"array",
          "items":{
             "type":"object",
             "properties":{
                "name":{
                   "type":"string"
                },
                "createdBy":{
                   "type":"number"
                },
                "createdAt":{
                   "type":"string"
                },
                "updatedBy":{
                   "type":"number"
                },
                "updatedAt":{
                   "type":"string"
                }
             }
          }
       }
    }
 }