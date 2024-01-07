PORT=8084

# Override the conf.
# Recompile, build the bundle.
rollup -c -o tests/browsers/reread-markdown.js

curl http://127.0.0.1:${PORT} -o /dev/null 2>/dev/null
res=$?
if test "$res" != "0"; then
    nohup node_modules/.bin/http-server -c-1 -p $PORT &
    sleep 2
    printf "Launch a local server (process %s) at the adress http://127.0.0.1:%s\n" $! $PORT
fi
# For logs.
# cat nohup.out

open http://127.0.0.1:${PORT}/tests/browsers/test.html