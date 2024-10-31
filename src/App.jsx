import { useEffect, useState } from 'react'

function App() {

    // State: Dictionary containing the character unicode -> strokes and medians
    const [charDict, setCharDict] = useState({})
    async function loadCharacters() {
        const response = await fetch("graphics.txt")
        const data = await response.text()
        const lines = data.trim().split("\n")

        const charDict = {}
        console.log("loading chardict")
        lines.forEach(line => {
            const item = JSON.parse(line)
            charDict[item.character] = item.strokes
        })

        setCharDict(charDict)
    }
    useEffect(() => {
        loadCharacters()
    }, [])

    // State: Current input characters
    const [characters, setCharacters] = useState(null)

    // Stroke data for the current input character state
    function getStrokes(characters) {
        try {
            const strokes = []
            console.log('characters', characters)

            characters.split("").forEach((c) => {
                console.log('hai', c)
                const stroke = charDict[c]
                if (stroke) {
                    strokes.push(stroke)
                }
            })
            return strokes
        } catch (error) {
            return null
        }
    }
    const charDatas = getStrokes(characters)

    return (
        <div className='m-10'>
            <div className="mb-4 flex items-center">
                <label className="mr-2">
                    Character:
                </label>
                <input
                    type="text"
                    placeholder='Enter characters'
                    onChange={(e) => { setCharacters(e.currentTarget.value) }}
                    className="border"
                />
            </div>

            <div className='flex flex-col'>
                {charDatas && charDatas.map((charData) => (
                    <div className='flex w-[120px] resize'>
                        <div className="mr-auto">
                            <Character charData={charData} />
                        </div>
                        <CharacterSBS charData={charData} />
                    </div>
                ))}
            </div>
        </div>
    )
}


const Character = ({ charData }) => {
    return (
        <div>
            <div className="flex">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1024 1024"
                    height="120"
                    width="120"
                >
                    <g transform="scale(1, -1) translate(0, -900)">
                        {charData.map((stroke, index) => (
                            <path key={index} d={stroke} fill="blue" stroke="black" strokeWidth="10" />
                        ))}
                    </g>
                </svg>
            </div>
        </div>
    )
}

const CharacterSBS = ({ charData }) => {
    return (
        <>
            {charData.map((_, index) => (
                <div className='border'>
                    <Character charData={charData.slice(0, index + 1)} />
                </div>
            ))}
        </>
    )
}

export default App
