const express = require('express');
const app = express();

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');


const authRouter = require('./routes/auth/auth.js');
const adminFirewallRulesRouter = require('./routes/admin/admin-ForwardingRules');
const adminHandleUsersController = require('./routes/admin/admin-HandleUsers');
const adminVlanRouter = require('./routes/admin/admin-Vlan');
const userFirewallRulesRouter = require('./routes/user/user-ForwardingRules');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/users', authRouter);
app.use('/admin/forwarding-firewall', adminFirewallRulesRouter);
app.use('/admin/network', adminVlanRouter);
app.use('/admin/users', adminHandleUsersController);
app.use('/user/forwarding-firewall', userFirewallRulesRouter);

module.exports = app;
