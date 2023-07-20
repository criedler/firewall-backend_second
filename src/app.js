const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const usersRouter = require('./routes/auth/auth.js');
const firewallRulesAdminRouter= require('./routes/admin/adminForwardingRules');
const vlanRouter= require('./routes/admin/adminVlan');
const firewallRulesUserRouter = require('./routes/user/userForwardingRules');

const app = express();
const cors = require('cors');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/users', usersRouter);
app.use('/forwarding-firewall_Admin', firewallRulesAdminRouter);
app.use('/forwarding-firewall_User', firewallRulesUserRouter);
app.use('/network', vlanRouter);

module.exports = app;
