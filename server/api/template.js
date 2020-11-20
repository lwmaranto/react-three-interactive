const router = require('express').Router();

// matches GET requests to /api/template/
router.get('/', function (req, res, next) { /* etc */});
// matches POST requests to /api/template/
router.post('/', function (req, res, next) { /* etc */});
// matches PUT requests to /api/template/:templateId
router.put('/:puppyId', function (req, res, next) { /* etc */});
// matches DELETE requests to /api/template/:templateId
router.delete('/:puppyId', function (req, res, next) { /* etc */});

module.exports = router;