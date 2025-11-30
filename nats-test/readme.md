# port forwarding to accrss a pod from localhost

kubectl port-forward nats-depl-6ccdc756f5-ql87x 4222:4222
kubectl port-forward nats-depl-6ccdc756f5-ql87x 8222:8222
http://localhost:8222/streaming
