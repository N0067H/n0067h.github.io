---
date: '2025-05-18T21:58:23+09:00'
draft: true
title: 'MessageQueue'
---

# Message Queue
메세지큐(MQ, MessageQueue)는 FIFO 순서를 보장하는 비동기 메세징 시스템이다.

감당하기 힘든 양의 요청이 들어오는 경우, 또는 실패에 대한 재시도가 필요한 경우에 쓰인다.

# MQ의 흐름
## Producer, Consumer
MQ에는 두 가지 역할이 있는데 하나는 메세지를 넣는 역할, 다른 하나는 꺼내는 역할이다.\
넣는 쪽을 Producer(생산자), 꺼내는 쪽을 Consumer(소비자)라고 한다.
```
[Producer] ㅡ [MQ] ㅡ [Consumer]
```
producer가 큐에 메세지를 넣으면 consumer는 메세지를 꺼내서 처리한다.\
\
producer와 consumer는 단일 인스턴스일 필요가 없다.
```
[Producer] \          / [Consumer]
[Producer] ㅡ [MQ] ㅡ [Consumer]
[producer] /          \ [Consumer]
```
여러 Producer가 동시에 메세지를 보내고, 여러 Consumer가 메세지를 병렬 처리하는 구조도 가능하다.\
메세지 분산 전략(RR 등)이나 토픽, 큐의 분리 등을 사용해 부하를 조절할 수 있다.

## 실패에 대한 재시도
메세지 처리가 실패했을 경우 시스템은 재시도를 통해 복구를 시도한다.

이때 처리 순서가 중요하다면 실패한 메세지를 우선적으로 해결한 후 다음 메세지로 넘어간다.\
반대로 순서가 중요하지 않다면 실패한 메세지를 다시 큐에 넣어 후순위로 만들거나,\
일정 횟수 실패 후 DLQ(Dead Letter Queue)에 위임한다.\
\
메세지 자체가 중요하지 않다면 실패한 메세지를 과감하게 버린다.

## ACK & NACK
ACK와 NACK는 큐가 메세지 처리의 실패를 확인하는 방법이다.
1. Consumer가 메세지를 받고, 처리를 완료하면 큐에 ACK를 보낸다.
2. 만약 처리 중 오류가 발생하거나, 모종의 이유로 실패했다면 NACK를 보낸다.\
   또는 아예 아무 것도 보내지 않고 메세지의 재전송을 유도할 수도 있다.

# Delivery Guarantees
이건 메세지의 전송, 즉 Consumer가 메세지를 받을 수 있냐를 보장하는 개념이다.\
보장 정도에 따라 레벨이 존재하고, 각 레벨은 장점과 동시에 트레이드오프도 존재한다.

## At-most-once
메세지의 최대 한 번 전송이 보장되는 레벨이다.\
실패하더라도 재시도하지 않고 그러려니 한다.

## At-least-once
메세지의 최소 한 번 이상 전송이 보장하는 레벨이다.\
하지만 중복이 발생할 수 있어서 Consumer 쪽에서 멱등성 처리가 필요하다.

## Exactly-once
정확히 한 번이 보장되는 레벨이다.
강력한 보장 대신 구현이 복잡하고, 성능 저하가 있다.

---

참조\
ㄴ https://blog.naver.com/sssang97/223856440036\
ㄴ https://blog.naver.com/sssang97/223859616848