
const slug = "/";
const route = (req, res) => {
  res.render('home');
  res.end();
};

export default {slug, route};