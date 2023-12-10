import express from 'express';

const slug = "/about-us";
const route = (req, res) => {
  res.render('about_us');
  res.end();
};

export default {slug, route};