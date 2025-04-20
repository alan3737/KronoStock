# KronoStock
Have you ever wanted to buy something but its always out of stock. You have come to the right place to learn about the product and buy it instantly when its available.
# git flow

main (or master): Represents the production-ready state. Only contains tagged release versions.
develop: The main integration branch for ongoing development. Features are merged into develop.
feature/<feature-name>: Short-lived branches branched off develop to develop specific features. Once a feature is complete, it's merged back into develop.
release/<version>: Short-lived branches branched off develop to prepare for a new release. Bug fixes and final tweaks happen here. Once ready, it's merged into both main (tagged with the release version) and develop.
hotfix/<version>: Short-lived branches branched off main to quickly fix critical bugs in the production version. Once fixed, it's merged into both main (tagged with the hotfix version) and develop.

# MVP

# TODO
