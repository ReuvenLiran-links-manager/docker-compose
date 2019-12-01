FROM haproxy:1.9.3-alpine

COPY haproxy.cfg /usr/local/etc/haproxy
EXPOSE 6379
EXPOSE 7777
ENTRYPOINT ["haproxy", "-f", "/usr/local/etc/haproxy/haproxy.cfg", "-db"]