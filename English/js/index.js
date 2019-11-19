import data from './data.json'
import $ from 'jquery';
import Mustache from 'mustache'
import 'bootstrap';
import '../style.scss';
import '../favicons/favicons';


let monthToText = month => {
  switch (month) {
    // case 1:
    //   return "January"
    // case 2:
    //   return "February"
    // case 3:
    //   return "March"
    // case 4:
    //   return "April"
    // case 5:
    //   return "May"
    // case 6:
    //   return "June"
    // case 7:
    //   return "July"
    // case 8:
    //   return "August"
    // case 9:
    //   return "September"
    // case 10:
    //   return "October"
    // case 11:
    //   return "November"
    // case 12:
    //   return "December"

    case 1:
        return "Jan."
      case 2:
        return "Feb."
      case 3:
        return "Mar."
      case 4:
        return "Apr."
      case 5:
        return "May"
      case 6:
        return "June"
      case 7:
        return "July"
      case 8:
        return "Aug."
      case 9:
        return "Sep."
      case 10:
        return "Oct."
      case 11:
        return "Nov."
      case 12:
        return "Dec."

    default:
      return "Error"
  }
}

let printTime = time => {
  let print = '';
  if (time.day)
    print += `${time.day}. `
  if (time.month)
    print += `${monthToText(time.month)} `
  if (time.year)
    print += `${time.year}`

  return print;
}

let printFullTime = time => {
  if (!time.start)
    return printTime(time)

  let print = `${printTime(time.start)} - `;

  if (time.end)
    print += ` ${printTime(time.end)}`;
  else 
    print += ` present`;

  return print;
}

let printPlacement = placement => {
  let place = placement;
  switch (placement) {
    case 1:
      place += "st";
      break;
    case 2:
      place += "nd";
      break;
    case 3:
      place += "rd";
      break;
  }

  place += " place";
  return place;
}

let printTeams = teams => {
  if(!teams)
    return '';
  return `(of ${teams} teams)`
}

let printFullPlacement = (placement, teams) => {
  return `${printPlacement(placement)} ${printTeams(teams)}`
}

// ===================== Templates ============================ 

let sectionTemplate = $('#section-template').html();
Mustache.parse(sectionTemplate);

let sectionItemTemplate = $('#section-item-template').html();
Mustache.parse(sectionItemTemplate);

let smallSectionTemplate = $('#small-section-template').html();
Mustache.parse(sectionTemplate);

let smallSectionCardTemplate = $('#small-section-card-template').html();
Mustache.parse(sectionItemTemplate);

let smallSectionItemTemplate = $('#small-section-item-template').html();
Mustache.parse(sectionItemTemplate);

// ============================================================ 


// ====================== Experience ========================== 

let experienceRenderedTemplate = Mustache.render(sectionTemplate, {
  title: "Experience",
  div: "experience-data"
})

let experience = data.experience;
let experienceRenderedItem = '';
for (const item of experience) {
  if(item.hidden === true)
    continue;
  experienceRenderedItem +=
    Mustache.render(sectionItemTemplate, {
      h2_title: item.institution,
      a_link: item.link,
      a_text: item.link,
      info: item.position,
      time: printFullTime(item.time),
    })
};

$('#experience').html(experienceRenderedTemplate);
$('#experience-data').html(experienceRenderedItem);

// ============================================================

// ===================== Education ============================ 

let educationRenderedTemplate = Mustache.render(sectionTemplate, {
  title: "Education",
  div: "education-data"
})

let education = data.education;
let educationRenderedItem = '';
for (const item of education) {
  if(item.hidden === true)
    continue;
  educationRenderedItem +=
    Mustache.render(sectionItemTemplate, {
      h2_title: item.degree,
      h4_text: item.institution,
      time: printFullTime(item.time)
    })
};

$('#education').html(educationRenderedTemplate);
$('#education-data').html(educationRenderedItem);

// ============================================================ 

// ====================== Projects ============================ 

let projectsRenderedTemplate = Mustache.render(sectionTemplate, {
  title: "Projects",
  div: "projects-data"
})

let projects = data.projects;
let projectsRenderedItem = '';
for (const item of projects) {
  if(item.hidden === true)
    continue;
  projectsRenderedItem +=
    Mustache.render(sectionItemTemplate, {
      h3_title: item.title,
      a_link: item.link,
      a_text: item.link,
      text: item.description,
      info: item.technologies,
      time: printFullTime(item.time),
    })
};

$('#projects').html(projectsRenderedTemplate);
$('#projects-data').html(projectsRenderedItem);

// ============================================================ 

// ======================= Awards ============================= 

let awardsRenderedTemplate = Mustache.render(sectionTemplate, {
  title: "Awards",
  div: "awards-data"
})

let awards = data.awards;
let awardsRenderedItem = '';
for (const item of awards) {
  if(item.hidden === true)
    continue;
  awardsRenderedItem +=
    Mustache.render(sectionItemTemplate, {
      h3_title: item.title,
      // a_link: item.link,
      // a_text: item.link,
      text: `${item.host} ${printFullPlacement(item.placement, item.teams)}`,
      info: item.description,
      time: printFullTime(item.time),
    })
};

$('#awards').html(awardsRenderedTemplate);
$('#awards-data').html(awardsRenderedItem);

// ============================================================ 

// ======================= Skills ============================= 

let skillsRenderedTemplate = Mustache.render(smallSectionTemplate, {
  title: "Skills",
  div: "skills-data"
})

let skills = data.skills;
let skillsRenderedCard = '';
for (const card of skills) {
  let key = Object.keys(card)[0];

  let currentCard =
    Mustache.render(smallSectionCardTemplate, {
      title: key,
    });

  let skillsRenderedItems = '';
  for (const item of card[key]) {
    skillsRenderedItems +=
    Mustache.render(smallSectionItemTemplate, {
      item: item,
    });
  }

  currentCard = currentCard.replace("CARD_ITEMS", skillsRenderedItems);

  skillsRenderedCard += currentCard;
};

$('#skills').html(skillsRenderedTemplate);
$('#skills-data').html(skillsRenderedCard);

// ============================================================

// ======================= Additional ==========================

let additionalRenderedTemplate = Mustache.render(smallSectionTemplate, {
  title: "Additional",
  div: "additional-data"
})

let additional = data.additional;
let additionalRenderedCard = '';

for (const card of additional) {
  let key = Object.keys(card)[0];

  let currentCard =
    Mustache.render(smallSectionCardTemplate, {
      title: key,
    });

  let additionalRenderedItems = '';
  for (const item of card[key]) {
    additionalRenderedItems +=
    Mustache.render(smallSectionItemTemplate, {
      item: item,
    });
  }

  currentCard = currentCard.replace("CARD_ITEMS", additionalRenderedItems);

  additionalRenderedCard += currentCard;
};

$('#additional').html(additionalRenderedTemplate);
$('#additional-data').html(additionalRenderedCard);

// ============================================================ 

// =============== Removes empty headers ======================= 
console.log("ASD")
$('h1, h2, h3, h4, h5, h6, p').each(function(){
  if(!$(this).text() || !$(this).text().trim())
    $(this).remove();
 })
// ============================================================ 
