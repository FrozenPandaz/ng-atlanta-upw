import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

import * as express from 'express';
import * as expressWinston from 'express-winston';
import * as path from 'path';
import * as winston from 'winston';
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('../dist-server/main.bundle');

import * as fs from 'fs';

export function getServer() {
  const server = express();

  const root = path.resolve(__dirname, '..');
  const distPath = path.resolve(root, 'dist');
  const indexPath = path.resolve(distPath, 'index.html');
  const document = fs.readFileSync(indexPath).toString();

  server.use(expressWinston.logger({
    transports: [
      new winston.transports.Console({
        colorize: true
      })
    ],
    meta: false,
    msg: `[{{req.method}}] <- {{req.url}} ({{res.statusCode}} in {{res.responseTime}})`
  }));

  server.use(express.static(distPath, {
    index: false
  }));

  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [
      provideModuleMap(LAZY_MODULE_MAP)
    ]
  }));

  const routes = [
    '/:listName',
    '/edit/:listName',
    '/profile/:profileSlug',
    '/edit/profile/:profileSlug'
  ];

  routes.forEach((route) => {
    server.get(route, (req, res) => {
      res.setHeader('Cache-Control', `public, s-maxage=${60 * 60}`);

      if (req.query.dynamic === 'true') {
        res.send(document);
        return;
      }

      res.render(indexPath, {
        req,
        res
      });
    });
  });

  server.get('/api/list/:listName', async (req, res) => {
    res.setHeader('Cache-Control', `public, max-age=${60 * 60}, s-maxage=${10 * 60}`);

    res.json(// 20180201114054
      // http://localhost:4300/api/list/fictional-power-women

      {
        "description": "The most powerful women from fiction",
        "id": "fictional-power-women",
        "name": "Fictional Power Women",
        "members": [
          {
            "profile": {
              "bio": "Jean’s mutant abilities manifested at the relatively young age of 10 - upon witnessing the death of her friend. Withdrawn and depressed from this event, Jean eventually met Charles Xavier who explained her being a mutant. After some time, she attends Xavier’s School for Gifted Youngsters, being trained to join the X-Men. It is there that she meets Scott Summers, Cyclops, and the two eventually marry. Her advanced powers ultimately enable her to manifest into the mutant Phoenix.",
              "firstName": "Jean",
              "id": "jean-grey",
              "image": "https://img.cinemablend.com/filter:scale/quill/1/6/0/d/2/f/160d2fecd5a21712d1336b6f11734abbfa9ed556.jpg?mw=600",
              "lastName": "Grey",
              "middleName": "",
              "name": "Jean Grey",
              "nameFormat": "FN LN"
            },
            "profileId": "jean-grey",
            "rank": 1
          },
          {
            "profile": {
              "bio": "The daughter of Loki (God of Mischief) and Angrboda, Hela is the Goddess of Death and the ruler of Hel and Niflheim. Hela’s rule of the dead is limited - Odin himself rules over the land of Valhalla, the afterlife for Asgardian heroes and their human worshippers. Despite this limitation, Hela continuously wishes to rule over Valhalla. She is a skilled fighter, capable of more than handling her own against Thor, son of Odin.",
              "firstName": "Hela",
              "id": "hela",
              "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsSd--3cB1yBaRvapV7MyGIKQPVzwWFFdx941WMPJOo5cw3jE5fw",
              "lastName": null,
              "middleName": "",
              "name": "Hela",
              "nameFormat": "FN"
            },
            "profileId": "hela",
            "rank": 2
          },
          {
            "profile": {
              "bio": "Born in Argo City of Krypton, Supergirl (Kara) is the daughter of Zor-El and Alura In-Ze. As a teenager, she is sent to Earth for her safety with her cousin Kal-El (Superman), however her ship is knocked off course. When she lands on Earth 24 years later, she is discovered by her cousin and adopted by the Danvers. Enrolling in high school, Kara suppresses her powers, attempting to live the life of a normal teenager with her sister Alex. After almost 12 years of relative normalcy, Kara embraces her powers and chooses to become a hero like Superman.",
              "firstName": "Supergirl",
              "id": "supergirl",
              "image": "https://tibs3.threeifbyspace.net/wp-content/uploads/2015/10/Supergirl.jpg",
              "lastName": "",
              "middleName": "",
              "name": "Supergirl",
              "nameFormat": "FN"
            },
            "profileId": "supergirl",
            "rank": 3
          },
          {
            "profile": {
              "bio": "Born on the island of Themyscira/Paradise Island, Princess Diana is the daughter of Queen Hippolyta of the Amazons. She grew up on the island, surrounded by women - embracing them as sisters and mothers. When she is a young woman, it is decreed by the gods that an emissary from the island must venture into Man’s World. The queen declares a contest to determine the island’s representative, however Diana is forbidden from entering. Defying her mother, she disguises herself and wins to be the Amazons’ champion. Carrying the Lasso of Truth, the Sandals of Hermes, and the Bracelets of Submission, Diana leaves her homeland and assumes the last name of Prince. At first her mission is one of peace, but she soon begins her life as a heroine - taking on the the name of Wonder Woman.",
              "firstName": "Wonder",
              "id": "wonder-woman",
              "image": "https://cdn.vox-cdn.com/thumbor/FlVDTKsRqF84r4TI2w0N2z4Xnqc=/0x0:846x346/1200x800/filters:focal(365x46:499x180)/cdn.vox-cdn.com/uploads/chorus_image/image/55091987/Screenshot_2016-11-03_12.07.41.0.0.png",
              "lastName": "Woman",
              "middleName": "",
              "name": "Wonder Woman",
              "nameFormat": "FN LN"
            },
            "profileId": "wonder-woman",
            "rank": 4
          },
          {
            "profile": {
              "bio": "Descended from an ancient line of African priestesses, Ororo was born in the US, but moved with her parents soon after to Cairo, Egypt. However, she found herself homeless upon the death of her parents at the age of 5 in Cairo, Egypt. Eventually learning the skills of thievery and lock-picking, she ventured to the Serengeti - the land of her ancestors.  \tSettling in the Serengeti, she helped the local tribes with her mutant abilities - the control of weather. As such, she was worshipped as a goddess by the local people. After some time, she was recruited by Charles Xavier (Professor X) to join a new team of mutants - the X-Men. Taking the name Storm, she has shared leadership of the X-Men with the mutant Cyclops.",
              "firstName": "Storm",
              "id": "storm",
              "image": "https://images2.alphacoders.com/545/545175.jpg",
              "lastName": null,
              "middleName": null,
              "name": "Storm",
              "nameFormat": "FN"
            },
            "profileId": "storm",
            "rank": 5
          },
          {
            "profile": {
              "bio": "Rey’s origins are still unknown - born on an unknown planet and to nameless parents. Living on the planet of Jakku, she endures a hard life as a scavenger. As a young woman, she meets the droid BB-8, as well as various members of the Resistance. At first scared of her blossoming abilities of the Force, Rey eventually embraces her powers one she is abducted by Kylo Ren. Initially with the help of her friend Finn, Rey duels Ren and overpowers him to escape. Upon discovering the location of Luke Skywalker, she ventures to Ahch-To in order to learn the ways of the Force and become a Jedi.",
              "firstName": "Rey",
              "id": "rey",
              "image": "https://thegeekiverse.com/wp-content/uploads/2017/10/rey-tlj.jpg",
              "lastName": null,
              "middleName": "",
              "name": "Rey",
              "nameFormat": "FN"
            },
            "profileId": "rey",
            "rank": 6
          },
          {
            "profile": {
              "bio": "An Agent of SIELD",
              "firstName": "Quake",
              "id": "quake",
              "image": "https://static0.srcdn.com/wp-content/uploads/2016/12/Agents-of-SHIELD-Midseason-Finale-Daisy-Johnson.jpg",
              "lastName": "",
              "middleName": "",
              "name": "Quake",
              "nameFormat": "FN"
            },
            "profileId": "quake",
            "rank": 7
          },
          {
            "profile": {
              "bio": "Daughter of Tywin and Joanna Lannister of Casterly Rock, Cersei has also a twin brother Jaime and younger brother, Tyrion. She eventually marries King Robert Baratheon, becoming Queen of Westeros. Together, they have 3 children - Joffrey, Myrcella, and Tommen. However, unbeknownst to her husband (and most of Westeros), her children’s biological father is her brother Jaime. Upon the death of Robert, her son Joffrey becomes king - at least until his death and the ascension of her youngest son, Tommen to the throne. Shortly thereafter, both Myrcella and Tommen die, leaving Cersei alone. Despite these tragedies, her greed and desire for power lead her to claim the Iron Throne, declaring her Queen of the Andals and the First Men, Protector of the Seven Kingdoms. Head of Gryffindor House",
              "firstName": "Minerva",
              "id": "minerva-mcgonagall",
              "image": "https://lovelace-media.imgix.net/uploads/1022/f41a2ef0-e59e-0133-241a-0e1b1c96d76b.jpg",
              "lastName": "McGonagall",
              "middleName": "",
              "name": "Minerva McGonagall",
              "nameFormat": "FN LN"
            },
            "profileId": "minerva-mcgonagall",
            "rank": 8
          },
          {
            "profile": {
              "bio": "Katniss Everdeen is the daughter of Mr. and Mrs. Everdeen, as well as the elder sister of Primrose Everdeen. Upon her father’s death, Katniss becomes head of the family. When she is 16, she volunteers to take her sister’s place in the annual Hunger Games, representing District 12. Along with Peeta Mellark, the male tribute of District 12, she wins the Games. The following year, she and Peeta return to compete in the 3rd Quarter Quell (the 75th Hunger Games). Before the end of the Games, she and some allies are transported to the underground District 13, where she helps in leading the rebellion against the Capitol. After the defeat of the Capitol and the death of her sister Prim, Katniss returns to District 12, eventually marrying Peeta and having a 2 children.",
              "firstName": "Katniss",
              "id": "katniss-everdeen",
              "image": "https://jackflacco.files.wordpress.com/2013/11/jennifer-lawrence-as-katniss-everdeen-in-the-hunger-games.jpg",
              "lastName": "Everdeen",
              "middleName": "",
              "name": "Katniss Everdeen",
              "nameFormat": "FN LN"
            },
            "profileId": "katniss-everdeen",
            "rank": 9
          },
          {
            "profile": {
              "bio": "Girl with psychic powers",
              "firstName": "Eleven",
              "id": "eleven",
              "image": "https://ewedit.files.wordpress.com/2017/07/eleven1.jpg?crop=0px%2C34px%2C2700px%2C1419px&resize=1200%2C630",
              "lastName": null,
              "middleName": "",
              "name": "Eleven",
              "nameFormat": "FN"
            },
            "profileId": "eleven",
            "rank": 10
          },
          {
            "profile": {
              "bio": "Born and raised in Los Angeles, Buffy was the quintessential air-headed high schooler. However, her life drastically changes when she is approached by the Watcher’s Council and informs her that she is the foretold Vampire Slayer. While at first she is reluctant to accept her new-found destiny of protecting the world from demons and mythical beings, she eventually embraces her powers and defeats the vampire master Lothos. She then moves to Sunnydale, located atop the opening to Hell, where Buffy meets her new Watcher, Rupert Giles, and ultimately befriends Willow Rosenberg and Xander Harris. Over the course of the next years, Buffy struggles to balance her responsibilities as the Slayer as well as her desire to live life as a normal young woman.",
              "firstName": "Buffy",
              "id": "buffy-summers",
              "image": "https://images.moviepilot.com/images/c_fill,h_270,w_499/t_mp_quality_gif/v8ymneshtr1nuflts3jk/buffy-the-vampire-slayer-premiered-19-years-ago-here-are-15-buffy-summers-quotes-to-liv-883624.jpg",
              "lastName": "Summers",
              "middleName": "Anne",
              "name": "Buffy Anne Summers",
              "nameFormat": "FN MN LN"
            },
            "profileId": "buffy-summers",
            "rank": 11
          },
          {
            "profile": {
              "bio": "Daughter of Tywin and Joanna Lannister of Casterly Rock, Cersei has also a twin brother Jaime and younger brother, Tyrion. She eventually marries King Robert Baratheon, becoming Queen of Westeros. Together, they have 3 children - Joffrey, Myrcella, and Tommen. However, unbeknownst to her husband (and most of Westeros), her children’s biological father is her brother Jaime. Upon the death of Robert, her son Joffrey becomes king - at least until his death and the ascension of her youngest son, Tommen to the throne. Shortly thereafter, both Myrcella and Tommen die, leaving Cersei alone. Despite these tragedies, her greed and desire for power lead her to claim the Iron Throne, declaring her Queen of the Andals and the First Men, Protector of the Seven Kingdoms.",
              "firstName": "Cersei",
              "id": "cersei-lannister",
              "image": "https://img.maximummedia.ie/joe_co_uk/eyJkYXRhIjoie1widXJsXCI6XCJodHRwOlxcXC9cXFwvbWVkaWEtam9lY291ay5tYXhpbXVtbWVkaWEuaWUuczMuYW1hem9uYXdzLmNvbVxcXC93cC1jb250ZW50XFxcL3VwbG9hZHNcXFwvMjAxN1xcXC8wN1xcXC8zMDE4Mzg0N1xcXC9DZXJzZWkuanBnXCIsXCJ3aWR0aFwiOjY0NyxcImhlaWdodFwiOjM0MCxcImRlZmF1bHRcIjpcImh0dHBzOlxcXC9cXFwvd3d3LmpvZS5jby51a1xcXC9hc3NldHNcXFwvaW1hZ2VzXFxcL2pvZWNvdWtcXFwvbm8taW1hZ2UucG5nP3Y9NFwifSIsImhhc2giOiI2NzRmYzIzM2ZkNjBjYzU0ZGNiZmY2NThlNTI4NDM2YzA0NjVkY2I5In0=/cersei.jpg",
              "lastName": "Lannister",
              "middleName": "",
              "name": "Cersei Lannister",
              "nameFormat": "FN LN"
            },
            "profileId": "cersei-lannister",
            "rank": 12
          },
          {
            "profile": {
              "bio": "The youngest child of King Aerys II Targaryen and his sister-wife Queen Rhaella, Daenerys has spent practically her entire life in exile after the death of her parents and eldest brother, Rhaegar. To aid her brother, Viserys’ claim to the Iron Throne, she is married to Khal Drogo of the Dothraki. When Viserys is killed, she becomes the Targaryen claimant to the throne. After the death of her husband and unborn child, Daenerys takes command of the khalasar, assuming the role of leader (Khaleesi) and wielding 3 newborn dragons. As she conquers the area of Slaver’s Bay, her army quickly grows (as well the devotion of the people). With her growing confidence as a leader, she commands her army and dragons to travel to Westeros where she hopes to conquer the Iron Throne and become Queen of the Andals and the First Men, Protector of the Seven Kingdoms.",
              "firstName": "Daenerys",
              "id": "daenerys-targaryen",
              "image": "https://www.hbo.com/content/dam/hbodata/series/game-of-thrones/character/s5/daenarys-1920.jpg/_jcr_content/renditions/cq5dam.web.1200.675.jpeg",
              "lastName": "Targaryen",
              "middleName": "",
              "name": "Daenerys Targaryen",
              "nameFormat": "FN LN"
            },
            "profileId": "daenerys-targaryen",
            "rank": 13
          },
          {
            "profile": {
              "bio": "The daughter of Galen and Lyra Erso, she is taken in by Saw Geurrera upon the death/disappearance of her parents. Eventually, she is a wanted criminal and is captured by the Empire.She is assisted in escaping capture during transfer to a prison camp, ultimately joining the Rebel Alliance. Assembling a small team, she attempts to steal the contraction plans for the Empire’s new Death Star on the planet Scarif. While her plan ultimately succeeds and the information is safely delivered to Princess Leia, Jyn and her team are killed when Scarif is destroyed.",
              "firstName": "Jyn",
              "id": "jyn-erso",
              "image": "https://static.independent.co.uk/s3fs-public/thumbnails/image/2016/12/17/12/felicity-jones-jyn-erso.jpg",
              "lastName": "Erso",
              "middleName": "",
              "name": "Jyn Erso",
              "nameFormat": "FN LN"
            },
            "profileId": "jyn-erso",
            "rank": 14
          },
          {
            "profile": {
              "bio": "The early years of Mystique (Raven Darkholme) are mostly a mystery - her actual age and origins are unknown. Mystique is a metamorph - she can take on the appearance of other humans and mutants. However, she is incapable of mimicking other mutants’ abilities. Her power has allowed her to assume the identity of various individuals, including the Deputy Director of the Defense Advanced Research Planning Agency (DARPA) in the Department of Defense. This position has given her unheard of access to classified information and weaponry, both of which she has used to her own gain. She has also re-organized the Brotherhood of Mutants, a villainous group. She is the mother of Graydon Creed and the mutant Nightcrawler, as well as the adoptive mother of the mutant Rogue.",
              "firstName": "Mystique",
              "id": "mystique",
              "image": "https://static0.srcdn.com/wp-content/uploads/Mystique-Days-of-Future-Past-Jennifer-Lawrence.jpg",
              "lastName": "",
              "middleName": "",
              "name": "Mystique",
              "nameFormat": "FN"
            },
            "profileId": "mystique",
            "rank": 15
          },
          {
            "profile": {
              "bio": "President of the United States",
              "firstName": "Claire",
              "id": "claire-underwood",
              "image": "https://nypdecider.files.wordpress.com/2017/07/claire-underwood-house-of-cards.png",
              "lastName": "Underwood",
              "middleName": "",
              "name": "Claire Underwood",
              "nameFormat": "FN LN"
            },
            "profileId": "claire-underwood",
            "rank": 16
          },
          {
            "profile": {
              "bio": "Chief of Staff to Millie Grant",
              "firstName": "Olivia",
              "id": "olivia-pope",
              "image": "https://typeset-beta.imgix.net/uploads/image/2017/10/25/1039cefd-2451-446a-952b-f06e4a31a3aa-o-olivia-pope-facebook.jpg",
              "lastName": "Pope",
              "middleName": "",
              "name": "Olivia Pope",
              "nameFormat": "FN LN"
            },
            "profileId": "olivia-pope",
            "rank": 17
          },
          {
            "profile": {
              "bio": "As a member of the Resistance, Rose assumes the role of technician onboard the Raddus. She is devastated upon the death of her older sister, Paige. Accompanied by her new friend, Finn, she embarks on a mission to sneak aboard the First Order’s ship the Supremacy in attempt to dismantle the massive weaponry of the First Order. She fights with the Resistance on Crait and escapes onboard the Millennium Falcon with the last of the battle’s survivors.",
              "firstName": "Rose",
              "id": "rose-tico",
              "image": "https://lumiere-a.akamaihd.net/v1/images/rose-tico-db-tlj_a70bef86.jpeg?region=0%2C16%2C1280%2C640",
              "lastName": "Tico",
              "middleName": "",
              "name": "Rose Tico",
              "nameFormat": "FN LN"
            },
            "profileId": "rose-tico",
            "rank": 18
          },
          {
            "profile": {
              "bio": "Daughter of Padme Amidala and Anakin Skywalker, Leia is the twin sister of Luke Skywalker. As a baby, she is adopted by Bail and Breha Organa, becoming a princess of Alderaan. Eventually she becomes a member of the Rebel Alliance, helping to defeat the Empire with Han Solo and her newly-discovered brother Luke. Later she marries Han as well as gives birth to a son, Ben. With the rise of the First Order and the defection of Ben (becoming the villain, Kylo Ren), Leia becomes a General of the Resistance.",
              "firstName": "Leia",
              "id": "leia-organa",
              "image": "https://images.moviepilot.com/images/c_limit,q_auto:good,w_600/cnxl2hc0jivfsrmh6clx/general-leia-organa-in-the-force-awakens-credit-lucasfilm.jpg",
              "lastName": "Organa",
              "middleName": "",
              "name": "Leia Organa",
              "nameFormat": "FN LN"
            },
            "profileId": "leia-organa",
            "rank": 19
          },
          {
            "profile": {
              "bio": "An only child, Hermione is the daughter of muggles Mr. and Mrs. Granger. At the age of 11, she is shocked and delighted to discover she is a witch - being invited to attend Hogwarts School of Witchcraft and Wizardry. She is sorted into Gryffindor, along with Harry Potter and Ron Weasley - her 2 best friends. She is widely considered to be one of the brightest students at Hogwarts, eventually becoming a prefect in her fifth year. She aids Harry Potter (along with Ron) in the defeat of Voldemort. After graduating from Hogwarts, Hermione joins the Ministry of Magic, working her way through the ranks to become Deputy Head of the Department of Magical Law Enforcement and later, Minister for Magic. She marries Ron Weasley and is the mother of Rose and Hugo Granger-Weasley.",
              "firstName": "Hermoine",
              "id": "hermione-granger",
              "image": "https://wallpapersite.com/images/wallpapers/harry-potter-3840x2160-deathly-hallows-part-2-hermione-emma-watson-152.jpg",
              "lastName": "Granger",
              "middleName": "",
              "name": "Hermoine Granger",
              "nameFormat": "FN LN"
            },
            "profileId": "hermione-granger",
            "rank": 20
          }
        ]
      });
  });

  server.get('/', (req, res) => {
    res.redirect('/fictional-power-women');
  });

  return server;
}
