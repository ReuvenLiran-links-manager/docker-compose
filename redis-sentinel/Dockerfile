FROM redis:5.0.3-alpine
 
ENV SENTINEL_QUORUM 2
ENV SENTINEL_DOWN_AFTER 3000
# ENV SENTINEL_DOWN_AFTER 1000
ENV SENTINEL_FAILOVER 6000
# ENV SENTINEL_FAILOVER 1000
 
RUN mkdir -p /redis
 
WORKDIR /redis

COPY notification.sh .
COPY sentinel.conf .
COPY sentinel-entrypoint.sh /usr/local/bin/
 
RUN chown redis:redis /redis/* && \
    chmod +x /usr/local/bin/sentinel-entrypoint.sh
    
RUN chmod +x ./notification.sh
RUN ls 
EXPOSE 26379
 
ENTRYPOINT ["sentinel-entrypoint.sh"]