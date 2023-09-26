FROM oven/bun

WORKDIR /home/app
COPY . /home/app

RUN bun install
RUN bun run build

CMD ["bun", "run", "start"]