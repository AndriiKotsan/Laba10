FROM golang:1.13 as builder
WORKDIR /go/src/github.com/pcherednichenko/simpleWebApp
ADD . .
ENV GO111MODULE=on
RUN CGO_ENABLED=0 GOOS=linux go build -o simpleWebApp

FROM alpine:3.10.2
RUN apk --no-cache add ca-certificates
COPY --from=builder /go/src/github.com/pcherednichenko/simpleWebApp/simpleWebApp simpleWebApp

CMD ["./simpleWebApp"]