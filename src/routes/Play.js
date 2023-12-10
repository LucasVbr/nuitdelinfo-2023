const slug = "/play";
const route = (req, res) => {
  res.render('play');
  res.end();
};

export default {slug, route};