FROM haproxy:1.9.3-alpine

COPY haproxy.cfg /usr/local/etc/haproxy
RUN mkdir -p /run/haproxy/
EXPOSE 32700
EXPOSE 7778
ENTRYPOINT ["haproxy", "-f", "/usr/local/etc/haproxy/haproxy.cfg", "-db"]