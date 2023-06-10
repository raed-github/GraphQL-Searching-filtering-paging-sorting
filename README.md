# Category:
## Creating a category mutation:
```html
mutation {
  createCategory(input: { name: "Fiction" }) {
    id
    name
  }
}
```
## Retrieving a category or categories query:
```html
query {  
  category(id: "6483bacc9c16de001244a0b2") {
    id
    name
  }
  
  categories {
    id
    name
  }
}
```
___

# Book:
## Creating a book Mutation:
```html
mutation {
  createBook(input: { name: "test2", categoryIds: ["648484d718692c0ba88c709d", "64848712c1792c443681ba9b"] }) {
    id
    name
    categories {
      id
      name
    }
  }
}
```
## Updating a book Mutation:
```html
mutation {
  updateBook(id: "book-id-1", input: { name: "updated name", categoryIds: ["category-id-2", "category-id-3"] }) {
    id
    name
    categories {
      id
      name
    }
  }
}
```
## Deleting a book Mutation:
```html
mutation {
  deleteBook(id: "64848690514172ca3e2b4183") {
    id
    name
  }
}
```
## Retrieving books Query:
```html
{
  books {
    total
    books {
      id
      name
      categories {
        id
        name
      }
    }
  }
}
```
## Search for a books Query:
```html
{
  books(search: "Gatsby", limit: 10, offset: 0) {
    total
    books {
      id
      name
      categories {
        id
        name
      }
    }
  }
}
```

