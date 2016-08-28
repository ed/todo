import React from 'react';
import { render } from 'react-dom';
import 'css/style.css';
import TaskSection from 'components/TaskSection';

import { browserHistory, Router, Route, Link, Redirect } from 'react-router'

render(<TaskSection/>
, document.getElementById('app'))
