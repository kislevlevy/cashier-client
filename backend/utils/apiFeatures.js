module.exports = class ApiFeatures {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  filter() {
    const nonFilterFields = ['sort', 'page', 'limit', 'fields', 'q'];
    const { q = '' } = this.req.query;

    // Make filter object for DB filtering:
    this.filterQuery = JSON.parse(
      JSON.stringify(this.req.query).replace(
        /\b(gt|gte|lt|lte|eq)\b/g,
        (match) => `$${match}`
      )
    );
    nonFilterFields.map((ele) => delete this.filterQuery[ele]);

    if (this.req.user.role === 'free') this.filterQuery.isPremium = false;
    if (q) this.filterQuery.name = new RegExp(q, 'i');

    // Assign res
    this.res.find(this.filterQuery);
    return this;
  }

  sort() {
    const { sort = 'name' } = this.req.query;
    this.res.sort(sort.replaceAll(',', ' '));
    return this;
  }

  fields() {
    const { fields = '-__v' } = this.req.query;
    this.res.select(fields.replaceAll(',', ' '));
    return this;
  }

  pagination() {
    const { page = 1, limit = 5 } = this.req.query;
    const skip = (page - 1) * limit;
    this.res.skip(skip).limit(limit);
    return this;
  }
};
