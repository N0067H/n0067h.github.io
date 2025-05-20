---
date: '2025-05-19T20:28:03+09:00'
draft: true
title: 'RabbitMQ: QuickStart'
summary: '🐇 RabbitMQ는 메세지 브로커다.'
---

![RabbitMQ](https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/RabbitMQ_logo.svg/1280px-RabbitMQ_logo.svg.png)

RabbitMQ는 메세지 브로커다.\
Rabbit Technologies가 만들어서 이런 이름이 붙었는데 현재는 VMWare가 관리한다더라.\
\
자주 Kafka와 비교군에 놓이던데 차이점은 아래 링크에 자세하게 나온다.\
https://aws.amazon.com/ko/compare/the-difference-between-rabbitmq-and-kafka/

# 설치하기
데비안 기준이다.\
https://www.rabbitmq.com/docs/install-debian
```bash
sudo apt-get update
sudo apt-get install rabbitmq-server
```
\
다 깔렸다면 서버를 데몬 프로세스로 실행해야 한다.
```bash
sudo systemctl start rabbitmq-server
```
\
잘 켜졌는지도 확인해보자.
```bash
sudo systemctl status rabbitmq-server
```
\
이제 플러그인 하나를 활성화하고
```bash
sudo rabbitmq-plugins enable rabbitmq_management
```
\
`http://localhost:15672` 에 접속하면 된다.
![Image 1](https://raw.githubusercontent.com/N0067H/n0067h.github.io/refs/heads/main/assets/RabbitMQ/QuickStart/img1.png)
기본 아이디/비밀번호는 guest/guest 이다.\
\
로그인하면 이렇게 관리 페이지가 뜰 거다.
![Image 2](https://raw.githubusercontent.com/N0067H/n0067h.github.io/refs/heads/main/assets/RabbitMQ/QuickStart/img2.png)



---

참조\
ㄴ https://en.wikipedia.org/wiki/RabbitMQ


