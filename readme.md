# How to run the project

- Lunch docker
- setup kubernetes and ingress
- edit /etc/hosts and add `127.0.0.1 ticketing.dev`
- create required kubenetes secrets
- Run `skaffold dev`
- Examine pods

# Urls

- client: https://ticketing.dev
- signup[POST]: https://ticketing.dev/api/users/signup
- grafana(browser url): https://ticketing.dev/monitoring/grafana
- prometheus(browser url): https://ticketing.dev/monitoring/prometheus

# kubernetes commands

- kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf
- kubectl get secrets

# Verify PVC objects

- kubectl get pvc

# How to add data source on grafan

- login to grafana with u: admin, p: admin
- add your first data source
- For prometheus
  - prometheus server url: http://prometheus-srv:9090
  - prometheus-srv: is the cluster Ip service of prometheus deployment that will help you to connect to prometheus server
- For Loki
  - Loki server url: http://loki-srv:9090
  - loki-srv: is the cluster Ip service of loki deployment that will help you to connect to loki server
- click `save and test` at bottom

# loki commands for ingress

- kubectl logs deploy/loki-depl
- https://ticketing.dev/monitoring/loki/ready
- https://ticketing.dev/monitoring/loki/metrics

# publish update npm package

- in common directory: publish packing using `pnpm pub`
- in other directory: update package using `pnpm update @deb-ticketing/common`
