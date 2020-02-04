const { RESTDataSource } = require('apollo-datasource-rest');
const convert = require('xml-js');

const KEY = process.env.GOODREADS_API_KEY;

// Ignore this. This is only becuase the Goodreads response is XML.
const sanitizeData = (data) => {
  return Object.keys(data).reduce((map, key) => {
    return {
      ...map,
      [key]: data[key]['_text'] || data[key]['_cdata'] || {},
    };
  }, {});
};

/*
  There's not a lot of magic going on here. There's some special things you can
  do in the constructor, but otherwise for simple usecases, these are just
  wrappers around `fetch`, to be used in an explicit manner in `resolvers`.
*/
class GoodreadsApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://www.goodreads.com/';
  }

  async getAuthor(id) {
    const response = await this.get(`author/show.xml?key=${KEY}&id=${id}`);
    const author = await convert.xml2js(response, { compact: true }).GoodreadsResponse.author;

    return sanitizeData(author)
  }

  async getBooks(authorId) {
    const response = await this.get(`author/list.xml?key=${KEY}&id=${authorId}`)
    const books = await convert.xml2js(response, { compact: true }).GoodreadsResponse.author.books.book;

    return books.map(b => sanitizeData(b));
  }
}

module.exports = GoodreadsApi;
