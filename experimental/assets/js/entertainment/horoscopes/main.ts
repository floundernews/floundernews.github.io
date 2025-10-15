enum Month {
  January,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December,
}

class CalendarDate {
  constructor(public month: Month, public day: number) {}
  public toString() {
    return `${Month[this.month].substr(0, 3)} ${this.day}`;
  }
}

class Horoscope {
  constructor(
    public name: string,
    public firstDate: CalendarDate,
    public lastDate: CalendarDate,
    public description: string
  ) {}
}

const DATA = [
  new Horoscope(
    "Aries",
    new CalendarDate(Month.March, 21),
    new CalendarDate(Month.April, 19),
    "Hot-headed as your sign, the Ram. Be kind this week and avoid butting heads. Remember to get sheared regularly to avoid overheating."
  ),
  new Horoscope(
    "Taurus",
    new CalendarDate(Month.April, 20),
    new CalendarDate(Month.May, 20),
    "Ambitious and determined, this year try to chill out a bit. High blood pressure will only harm you long term. Your friends all think you’re a try-hard. Only wear plaid this week, or else."
  ),
  new Horoscope(
    "Gemini",
    new CalendarDate(Month.May, 21),
    new CalendarDate(Month.June, 20),
    "One of the more misunderstood of the signs, remember: you’re not two-faced - you’re multi-faced. Own it! Also, go vegan this winter to avoid a tragic injury. Please."
  ),
  new Horoscope(
    "Cancer",
    new CalendarDate(Month.June, 21),
    new CalendarDate(Month.July, 22),
    "Usually an emotional wreck, this season, you will be surprisingly under control. What will you be under control of? I highly doubt it will be yourself. It’s not like I can see the future or anything."
  ),
  new Horoscope(
    "Leo",
    new CalendarDate(Month.July, 23),
    new CalendarDate(Month.August, 22),
    "Always thirsty for the spotlight, this month, decide whether you should clean your room. Today, confess to a crime you committed. If you didn’t commit it, even better."
  ),
  new Horoscope(
    "Virgo",
    new CalendarDate(Month.August, 23),
    new CalendarDate(Month.September, 22),
    "You have overcome so many adversaries this year, except one: yourself. Quit making excuses and be a better you. Avoid tall cliffs and rabid wolves."
  ),
  new Horoscope(
    "Libra",
    new CalendarDate(Month.September, 23),
    new CalendarDate(Month.October, 22),
    "Due to the position of the sun in the sky (probably somewhere in the middle), today you will have some amount of successes and failures."
  ),
  new Horoscope(
    "Scorpio",
    new CalendarDate(Month.October, 23),
    new CalendarDate(Month.November, 21),
    "Haha, look at your sign! It’s literally just an “M”. Look, I’m not saying that there’s anything wrong with the letter “M”, it’s just that I think you need a more interesting sign. At least you put in more effort than Aquarius over there."
  ),
  new Horoscope(
    "Sagittarius",
    new CalendarDate(Month.November, 22),
    new CalendarDate(Month.December, 19),
    "This month, your sign will be in full power. You will feel confident, self-assured, and strong; you will feel ready to tackle anything head on. Key word, “feel”."
  ),
  new Horoscope(
    "Capricorn",
    new CalendarDate(Month.December, 20),
    new CalendarDate(Month.January, 19),
    "This sign won’t tolerate bad vibes. Luckily, vibes are a figment of your imagination. Just vibe them away. Is this horoscope giving you bad vibes? What a shame."
  ),
  new Horoscope(
    "Aquarius",
    new CalendarDate(Month.January, 20),
    new CalendarDate(Month.February, 18),
    "You’ve worked yourself crazy all year, so sleep in and unwind this winter break. You will find this difficult now that the break is over. Scorpio’s talking trash about you."
  ),
  new Horoscope(
    "Pisces",
    new CalendarDate(Month.February, 19),
    new CalendarDate(Month.March, 20),
    "The moon is waning and Mackenzus is in its second semester. Change is good, but only sometimes. Go to school, spend time with friends, and read The Flounder."
  ),
];

function getAttributionMessage(horoscopeName: string) {
  return `<a href="https://commons.wikimedia.org/wiki/File:${horoscopeName}_symbol_(Moskowitz,_fixed_width).svg">${horoscopeName} symbol</a> by <a href="https://commons.wikimedia.org/wiki/User:Kwamikagami">Denis Moskowitz</a> is licensed under <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.en">CC BY-SA 4.0</a>.`;
}

function highlightHoroscopeTab(name: string) {
  let tabs = document.getElementsByClassName("horoscope-tab");
  for (let tab of tabs) {
    if (tab.innerHTML == name) {
      tab.className = "horoscope-tab tab-selected";
    } else {
      tab.className = "horoscope-tab";
    }
  }
}

function showHoroscopeTab(index: number) {
  const horoscope = DATA[index];
  highlightHoroscopeTab(horoscope.name);
  document.getElementById("horoscope-name")!.innerHTML = horoscope.name;
  document.getElementById(
    "horoscope-dates"
  )!.innerHTML = `(${horoscope.firstDate} – ${horoscope.lastDate})`;
  document.getElementById("horoscope-description")!.innerHTML =
    horoscope.description;
  let image = document.getElementById("horoscope-img")! as HTMLImageElement;
  image.src = `/assets/img/horoscopes/${index}.svg`;
  document.getElementById("horoscope-img-attribution")!.innerHTML =
    getAttributionMessage(horoscope.name);
}

function addHoroscopeButtonToDocument(h: Horoscope, index: number) {
  let button = document.createElement("button");
  button.innerText = h.name;
  button.className = "horoscope-tab";
  button.onclick = () => showHoroscopeTab(index);
  document.getElementById("horoscope-tabs")!.appendChild(button);
}

function riskAccepted() {
  document.getElementById("horoscopes")!.style.display = "";
  document.getElementById("warning")!.style.display = "none";

  DATA.forEach(addHoroscopeButtonToDocument);
}
