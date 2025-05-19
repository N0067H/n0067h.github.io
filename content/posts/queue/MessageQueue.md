---
date: '2025-05-18T21:58:23+09:00'
draft: true
title: 'MessageQueue'
---

# Queue, Message Queue
자료구조론에서 큐(Queue)는 FIFO(First in first out) 순서를 보장하는 추상적인 자료구조고\
메세지큐(MQ, MessageQueue)는 이 자료구조를 바탕으로 만들어진 비동기 메세징 시스템이다.

감당하기 힘든 양의 요청이 들어오는 경우, 또는 실패에 대한 재시도가 필요한 경우에 쓰인다.

# MQ의 흐름
## Producer, Consumer
MQ에는 두 가지 역할이 있는데 하나는 메세지를 넣는 역할, 다른 하나는 꺼내는 역할이다.\
넣는 쪽을 Producer(생산자), 꺼내는 쪽을 Consumer(소비자)라고 한다.
```
[Producer] ㅡ [QUEUE] ㅡ [Consumer]
```
producer가 큐에 메세지를 넣으면 consumer는 메세지를 꺼내서 처리한다.\
이 때 
\
producer와 consumer는 스케일아웃도 가능하다.
```
[Producer] \          / [Consumer]
[Producer] ㅡ [QUEUE] ㅡ [Consumer]
[producer] /          \ [Consumer]
```
이렇게 구성할 때는 부하나 토픽, 확장성 등을 고려해야 한다.

## 실패에 대한 재시도
처리 순서가 중요하다면 실패에 대한 재시도를 반복한다.\
단 재시도 중에는 다른 메세지를 처리할 수 없다.\
\
순서가 중요하지 않다면 실패한 메세지를 다시 큐에 넣어 후순위로 만들거나,\
재시도를 위한 별도의 큐를 만들고 일괄적으로 재시도한다.\
\
메세지 자체가 중요하지 않다면 실패한 메세지를 과감하게 버린다.

# Delivery Guarantees
이건 메세지의 전송, 즉 Consumer가 메세지를 받을 수 있냐를 보장하는 개념이다.\
보장 정도에 따라 레벨이 존재하고, 각 레벨은 장점과 동시에 트레이드오프도 존재한다.

## At-most-once
최대 한 번이 보장되는 레벨이다.\
보내질 수도 있고, 안 보내질 수도 있다. 누가 받던 말던 신경쓰지 않기 때문에 성능 상 이점이 있다.

## At-least-once
최소 한 번이 보장되는 레벨이다.\
컨슈머가 못받은 것 같으면 다시 보내고를 반복한다.\
무조건 한 번은 보장하지만, 두 번 이상 보내지는 버그가 발생할 수도 있다.

## Exactly-once
정확히 한 번이 보장되는 레벨이다.\
정확히 한 번이라는 강력한 보장 대신 성능이 떨어지거나 구현의 복잡성이 증가한다.

---

참조\
ㄴ https://blog.naver.com/sssang97/223856440036\
ㄴ https://blog.naver.com/sssang97/223859616848