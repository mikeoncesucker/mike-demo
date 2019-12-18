FROM nginx:1.15.10-alpine

ENV EXHIBIT_CONSOLE_HOME=/home/exhibit/exhibit-console

COPY build ${EXHIBIT_CONSOLE_HOME}/html
COPY conf ${EXHIBIT_CONSOLE_HOME}/conf

RUN rm -f /etc/nginx/conf.d/* && \
  ln -s ${EXHIBIT_CONSOLE_HOME}/conf/exhibit-console.conf /etc/nginx/conf.d/
# sed -i -e '/^user /s/^.*$/daemon off;/' -e '/worker_processes /s/1/auto/' /etc/nginx/nginx.conf

WORKDIR ${EXHIBIT_CONSOLE_HOME}