
import Drawings from "./Assets/drawings/drawings.mjs"
import * as fs from 'fs';

// console.log(Drawings);

let R = {}

for (const drawingID in Drawings) {
    if (Object.hasOwnProperty.call(Drawings, drawingID)) {

        const drawing = Drawings[drawingID];
        // console.log(drawing, "\n\n\n");

        let r = {};
        r["viewBox"] = drawing.attributes.viewBox;
        r["preserveAspectRatio"] = drawing.attributes.preserveAspectRatio;

        r["gs"] = []


        for (const metachild of drawing.children) {
            // console.log(metachild, "\n\n\n");

            if (metachild.name === "g") {

                let vectors = { path: [] };
                for (const vecd of metachild.children) {
                    // console.log(vecd, "\n\n\n");
                    vectors[vecd.name].push({
                        fill: vecd.attributes.fill,
                        stroke: vecd.attributes.stroke,
                        d: vecd.attributes.d
                    })
                }

                let g = {
                    transform: metachild.attributes.transform,
                    fill: metachild.attributes.fill,
                    stroke: metachild.attributes.stroke,
                    vectors: vectors
                }

                r.gs.push(g);

            }
        }

        R[drawingID] = r;
    }

}


fs.writeFileSync("src/drawings.js", "export default " + JSON.stringify(R, null, 1, "\n\n\n"));
