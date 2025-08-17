const notfound=(req, res, next) => {
  res.status(404);
  res.render('404')
}
exports.notfound=notfound;