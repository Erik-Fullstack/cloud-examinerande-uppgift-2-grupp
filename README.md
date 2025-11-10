# Projektets namn

## Beskrivning
Dagbok

---

# Repo

## Branching Strategy
Vi har jobbat med "feature/branches" och har satt upp regler att en person måste reviewa och approva, innan det mergas in till main.
## Commit-historik
Vi har drivit en tydlig commit-historik med fokus på vad feature/branchen utför och har uppnåt, den som reviewar och approvar koden ska kunna få en snabb inblick till vad som har arbetats på respektive branch.
## Issues och PRs
Vi använde och fixade de issues som fanns i repot från början. Sedan har vi inte haft så mycket issues/buggar och pga att vi har jobbat i feature branches så har de delar vi valt att implementera inte varit så stora åt gången och vi har inte känt att vi behöver lägga till fler issues efter dom första fixades. De issues som uppstått hanterades istället verbalt över möten och arbetspass. Varje PR krävde 1 approval från en annan kodare samt checkades av våra github actions. 
## Projektverktyg (GitHub Projects eller Jira)
Vi valde att använda github projects och satte upp en kanban board där vi la upp nya logs/tasks när vi kom på/bestämde något vi ville implementera. Under projektets gång använde vi kanban-boarden mindre då mycket av arbetet genomfördes under arbetspass där alla var närvarande och att lägga upp nya task hade varit ineffektivt. Även fast vi inte använde den till hela projektet så kan alla klart o tydligt se vad folk har jobbat på och gjort genom våran branching strategy/commit meddelanden och PR reviews.


# Docker

## Dockerfile
Vi började från dockerfilen som fanns i repot från start, vi fortsatte sedan att utveckla den för att optimera image storleken. Då vi inte valde att bryta ut supabase från vår frontend så blev det lite strul med docker när vi la in en dockerignore så vi löste det genom att bygga imagen med våra env variabler i build stadiet.

## Bygga och köra projektet med Docker
Vi satte upp ett github-workflow som vid varje PR pushar vår image till dockerhub som i sin tur sen hämtas av render och deployar containern automatiskt, denna deploy uppdateras då vid varje PR.

---

# Tester

## Testsetup (Jest)
Vi har implementerat Jest och har kört några grundläggande tester för att se att det fungerar. Vi har även satt upp ett github workflow som testar att bygga vår docker image när vi pushar(mergar) in till main.

---

# AI-användning

## Vad som är AI-genererat
Vi har använt en hel del ai för att skapa och lära oss om diverse dockerfiler, tester, felsökning och workflows.
Dockerfilen, .github-workflows är genererade av AI, sedan har vi ändrat dessa och uppdaterat eftersom delvis med våra egna idéer och justeringar.
## Hur AI använts för tester och utveckling
Genom att kolla upp och hjälpa till med saker som vi inte hade tillräckligt med kunskap om, genom att ge oss en bättre bild om hur det fungerar och ska göras. Även om vi inte helt själva skulle kunna implementera dessa filer/funktioner så har vi en tillräckligt god kunskap om att förstå vad de gör.

---

# GitHub Actions

## Workflows
Vi har ett workflow "docker-ci" som vid pull requests till main-branchen gör en check med "build" jobbet och enligt github reglerna så kan mergen enbart godkännas om den bygger en image utan errors.

När mergen sedan händer till main så kommer workflowet att bygga samma image igen (som vi vet fungerar) och pusha den till docker hub.

Till slut efter detta så skickas en webhook till render som automatiskt kollar på den nyaste tagen i docker hub repot och bygger deployment på den.

---

# CI/CD-pipelinen

## Förklaring av pipeline
Vi har gjort ordentliga commits, skapat tester, merge rules på repot, skapat images, automatiserade workflows och deployments.
## Pipeline-steg
Våra pipeline steg är beskrivna kontinuerligt i denna readme fram till den här punkten.

---

# Motivation för avancerad CI/CD
Workflows för att automatisera deploys och undvika buggar i main, tester för att se till så att allt fungerar.
Allmänt lära oss mer och får mer kött på benen inom devOps.

---

# Körning av projektet (lokalt)
skapa .env med supabase keys. > "npm run dev"

---

# Bidragsgivare / Team
Erik Andersson, Filip Hansén, Mladen Kovacic, William Gertoft, openAI.

---


