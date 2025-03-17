#!/bin/bash

trap "kill -- -$$" EXIT
(cd ../back/placeholder-api && node index.js) &
(cd ../front/app && npm run dev)
