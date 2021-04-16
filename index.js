/* global $ */

import iepLoadPromise from 'instrumenpoche'
import CodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/monokai.css'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/xml/xml.js'
import 'codemirror/mode/htmlmixed/htmlmixed.js'
import 'codemirror/mode/stex/stex.js'
import 'codemirror/addon/hint/javascript-hint.js'
import 'codemirror/addon/hint/show-hint.js'
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/edit/closebrackets.js'
import Alea2iep from './include/Alea2iep.js'
import Sval from 'sval'
import globals from './include/globals.js'

// Les variables globales utiles pour l'autocomplétion
globals()
window.anim = new Alea2iep()

const divSvg = document.getElementById('svg')
const divSortieSvg = document.getElementById('sortieSvg')
const divXmlIep = document.getElementById('xmlSrc')
const buttonSubmit = document.getElementById('submit')
let buttonTelecharger
let buttonURL

const container = document.getElementById('containerIeP')
let xml = `
<?xml version="1.0" encoding="UTF-8"?>
<INSTRUMENPOCHE version="2">
</INSTRUMENPOCHE>
`

// Editeur de texte
const editeur = document.getElementById('editeur')
const myCodeMirror = CodeMirror(editeur, {
  value: '',
  mode: 'javascript',
  lineNumbers: true,
  autofocus: true,
  theme: 'monokai',
  autoCloseBrackets: true,
  showHint: true,
  extraKeys: { 'Ctrl-Space': 'autocomplete' },
  matchBrackets: true,
  lineWrapping: true
})
myCodeMirror.setSize(500, 550)

// Autocomplétion
myCodeMirror.on('inputRead', function onChange (editor, input) {
  if (input.text[0] === ';' || input.text[0] === ' ') {
    return
  }
  CodeMirror.commands.autocomplete(editor, null, { completeSingle: false })
})

// Bouton Valider
buttonSubmit.onclick = function () {
  // On sauvegarde dans le navigateur le code du script
  window.localStorage.setItem('Script Mathalea 2D IEP', myCodeMirror.getValue())
  // On réinitialise les variables
  window.anim = new Alea2iep()
  window.mathalea = { sortieNB: false, anglePerspective: 30, coeffPerspective: 0.5, pixelsParCm: 20, scale: 1, unitesLutinParCm: 50, mainlevee: false, amplitude: 1, fenetreMathalea2d: [-1, -10, 29, 10], objets2D: [] }
  window.sortie_html = true
  window.est_diaporama = false
  window.numId = 0

  const interpreter = new Sval({ ecmaVer: 10, sandBox: true }) // On créé une instance de l'interpréteur JS
  // On importe toutes les commandes que l'on souhaite avoir dans l'interpréteur
  interpreter.import({
    anim: anim,
    angleScratchTo2d: angleScratchTo2d,
    appartientSegment: appartientSegment,
    appartientDroite: appartientDroite,
    appartientDemiDroite: appartientDemiDroite,
    scratchblock: scratchblock,
    motifs: motifs,
    pattern: pattern,
    nomVecteurParPosition: nomVecteurParPosition,
    point: point,
    tracePoint: tracePoint,
    tracePointSurDroite: tracePointSurDroite,
    milieu: milieu,
    pointSurSegment: pointSurSegment,
    pointSurCercle: pointSurCercle,
    pointSurDroite: pointSurDroite,
    pointIntersectionDD: pointIntersectionDD,
    pointAdistance: pointAdistance,
    labelPoint: labelPoint,
    barycentre: barycentre,
    droite: droite,
    droiteParPointEtVecteur: droiteParPointEtVecteur,
    droiteParPointEtParallele: droiteParPointEtParallele,
    droiteParPointEtPerpendiculaire: droiteParPointEtPerpendiculaire,
    droiteHorizontaleParPoint: droiteHorizontaleParPoint,
    droiteVerticaleParPoint: droiteVerticaleParPoint,
    droiteParPointEtPente: droiteParPointEtPente,
    mediatrice: mediatrice,
    codageMediatrice: codageMediatrice,
    codageMilieu: codageMilieu,
    constructionMediatrice: constructionMediatrice,
    bissectrice: bissectrice,
    codageBissectrice: codageBissectrice,
    constructionBissectrice: constructionBissectrice,
    polyline: polyline,
    pave: pave,
    vecteur: vecteur,
    segment: segment,
    segmentAvecExtremites: segmentAvecExtremites,
    demiDroite: demiDroite,
    demiDroiteAvecExtremite: demiDroiteAvecExtremite,
    polygone: polygone,
    polygoneAvecNom: polygoneAvecNom,
    polygoneRegulier: polygoneRegulier,
    polygoneRegulierIndirect: polygoneRegulierIndirect,
    carre: carre,
    carreIndirect: carreIndirect,
    codageCarre: codageCarre,
    polygoneRegulierParCentreEtRayon: polygoneRegulierParCentreEtRayon,
    triangle2points2longueurs: triangle2points2longueurs,
    triangle2points2angles: triangle2points2angles,
    triangle2points1angle1longueur: triangle2points1angle1longueur,
    triangle2points1angle1longueurOppose: triangle2points1angle1longueurOppose,
    nommePolygone: nommePolygone,
    deplaceLabel: deplaceLabel,
    aireTriangle: aireTriangle,
    cercle: cercle,
    ellipse: ellipse,
    pointIntersectionLC: pointIntersectionLC,
    pointIntersectionCC: pointIntersectionCC,
    cercleCentrePoint: cercleCentrePoint,
    arc: arc,
    arcPointPointAngle: arcPointPointAngle,
    traceCompas: traceCompas,
    courbeDeBezier: courbeDeBezier,
    segmentMainLevee: segmentMainLevee,
    cercleMainLevee: cercleMainLevee,
    droiteMainLevee: droiteMainLevee,
    polygoneMainLevee: polygoneMainLevee,
    arcMainLevee: arcMainLevee,
    dansLaCibleCarree: dansLaCibleCarree,
    dansLaCibleRonde: dansLaCibleRonde,
    cibleCarree: cibleCarree,
    cibleRonde: cibleRonde,
    cibleCouronne: cibleCouronne,
    translation: translation,
    translation2Points: translation2Points,
    rotation: rotation,
    sens_de_rotation: sens_de_rotation,
    homothetie: homothetie,
    symetrieAxiale: symetrieAxiale,
    distancePointDroite: distancePointDroite,
    projectionOrtho: projectionOrtho,
    affiniteOrtho: affiniteOrtho,
    similitude: similitude,
    translationAnimee: translationAnimee,
    rotationAnimee: rotationAnimee,
    homothetieAnimee: homothetieAnimee,
    symetrieAnimee: symetrieAnimee,
    affiniteOrthoAnimee: affiniteOrthoAnimee,
    montrerParDiv: montrerParDiv,
    cacherParDiv: cacherParDiv,
    afficherTempo: afficherTempo,
    afficherTempoId: afficherTempoId,
    afficherUnParUn: afficherUnParUn,
    medianeTriangle: medianeTriangle,
    centreGraviteTriangle: centreGraviteTriangle,
    hauteurTriangle: hauteurTriangle,
    CodageHauteurTriangle: CodageHauteurTriangle,
    codageHauteurTriangle: codageHauteurTriangle,
    codageMedianeTriangle: codageMedianeTriangle,
    orthoCentre: orthoCentre,
    centreCercleCirconscrit: centreCercleCirconscrit,
    codageAngleDroit: codageAngleDroit,
    afficheLongueurSegment: afficheLongueurSegment,
    texteSurSegment: texteSurSegment,
    afficheMesureAngle: afficheMesureAngle,
    afficheCoteSegment: afficheCoteSegment,
    codeSegment: codeSegment,
    codeSegments: codeSegments,
    codeAngle: codeAngle,
    nomAngleSaillantParPosition: nomAngleSaillantParPosition,
    nomAngleRentrantParPosition: nomAngleRentrantParPosition,
    droiteGraduee: droiteGraduee,
    droiteGraduee2: droiteGraduee2,
    axes: axes,
    labelX: labelX,
    labelY: labelY,
    grille: grille,
    grilleHorizontale: grilleHorizontale,
    grilleVerticale: grilleVerticale,
    seyes: seyes,
    repere: repere,
    repere2: repere2,
    pointDansRepere: pointDansRepere,
    traceGraphiqueCartesien: traceGraphiqueCartesien,
    traceBarre: traceBarre,
    traceBarreHorizontale: traceBarreHorizontale,
    lectureImage: lectureImage,
    lectureAntecedent: lectureAntecedent,
    courbe: courbe,
    courbe2: courbe2,
    courbeInterpolee: courbeInterpolee,
    graphiqueInterpole: graphiqueInterpole,
    imageInterpolee: imageInterpolee,
    antecedentInterpole: antecedentInterpole,
    crochetD: crochetD,
    crochetG: crochetG,
    intervalle: intervalle,
    texteParPoint: texteParPoint,
    texteParPosition: texteParPosition,
    latexParPoint: latexParPoint,
    latexParCoordonnees: latexParCoordonnees,
    fractionParPosition: fractionParPosition,
    print2d: print2d,
    longueur: longueur,
    norme: norme,
    angle: angle,
    angleOriente: angleOriente,
    angleradian: angleradian,
    creerLutin: creerLutin,
    avance: avance,
    baisseCrayon: baisseCrayon,
    leveCrayon: leveCrayon,
    orienter: orienter,
    tournerG: tournerG,
    tournerD: tournerD,
    allerA: allerA,
    mettrexA: mettrexA,
    mettreyA: mettreyA,
    ajouterAx: ajouterAx,
    ajouterAy: ajouterAy,
    afficherCrayon: afficherCrayon,
    deplaceInstrument: deplaceInstrument,
    codeSvg: codeSvg,
    codeTikz: codeTikz,
    mathalea2d: mathalea2d,
    labyrinthe: labyrinthe,
    pavage: pavage
  })

  if (buttonTelecharger) {
    buttonTelecharger.style.visibility = 'visible'
  }
  if (buttonURL) {
    buttonURL.style.visibility = 'visible'
  }
  window.mathalea.objets2D = []
  interpreter.run(myCodeMirror.getValue())
  interpreter.run('exports.anim = anim')
  // divXmlIep.value = window.IEP.script();
  xml = window.anim.script()
  iepLoadPromise(container, xml, { autostart: true }).then(iepApp => {
    // la figure est chargée
  }).catch(error => {
    // il y a eu un pb
    console.log(error)
  })
}
