FROM golang:1.13 as builder
WORKDIR /go/src/github.com/AndriiKotsan/Laba10

ADD . .
ENV GO111MODULE=on
RUN CGO_ENABLED=0 GOOS=linux go build -o Laba10

FROM alpine:3.10.2
RUN apk --no-cache add ca-certificates
COPY --from=builder /go/src/github.com/pcherednichenko/Laba10/Laba10 Laba10

CMD ["./Laba10"]
