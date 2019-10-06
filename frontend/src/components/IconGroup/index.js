import React, { useState } from 'react'
import { Button, Icon } from 'semantic-ui-react'
const App = () => {
    return <Headline />;
};
const Headline = () => {
    const [greeting] = useState(
        ''
    )
  return (
    <>
    <Icon name={greeting} />
    <div style={{flex: 1, border: '1px solid #aeaeae', borderRadius: '4px', overflowY: 'auto', height: '200px', padding: '10px 20px'}}>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','exchange') }><Icon size='big' name='exchange'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','recycle') }><Icon size='big' name='recycle'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','headphones') }><Icon size='big' name='headphones'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','music') }><Icon size='big' name='music'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','video') }><Icon size='big' name='video'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','adress card outline') }><Icon size='big' name='address card outline'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','briefcase') }><Icon size='big' name='briefcase'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','book') }><Icon size='big' name='book'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','balance scale') }><Icon size='big' name='balance scale'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','building outline') }><Icon size='big' name='building outline'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','bullhorn') }><Icon size='big' name='bullhorn'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','certificate') }><Icon size='big' name='certificate'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','coffee') }><Icon size='big' name='coffee'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','compass outline') }><Icon size='big' name='compass outline'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','envelope') }><Icon size='big' name='envelope'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','phone') }><Icon size='big' name='phone'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','pencil alternate') }><Icon size='big' name='pencil alternate'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','save') }><Icon size='big' name='save'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','sitemap') }><Icon size='big' name='sitemap'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','barcode') }><Icon size='big' name='barcode'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','fire extinguisher') }><Icon size='big' name='fire extinguisher'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','bath') }><Icon size='big' name='bath'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','at') }><Icon size='big' name='at'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','mobile alternate') }><Icon size='big' name='mobile alternate'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','wifi') }><Icon size='big' name='wifi'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','desktop') }><Icon size='big' name='desktop'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','laptop') }><Icon size='big' name='laptop'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','hdd outline') }><Icon size='big' name='hdd outline'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','plug') }><Icon size='big' name='plug'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','print') }><Icon size='big' name='print'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','dollar sign') }><Icon size='big' name='dollar sign'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','euro sign') }><Icon size='big' name='euro sign'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','hourglass half') }><Icon size='big' name='hourglass half'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','eye') }><Icon size='big' name='eye'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','cut') }><Icon size='big' name='cut'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','trash alternate') }><Icon size='big' name='trash alternate'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','handshake') }><Icon size='big' name='handshake'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','thumbs up outline') }><Icon size='big' name='thumbs up outline'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','thumbs down outline') }><Icon size='big' name='thumbs down outline'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','ambulance') }><Icon size='big' name='ambulance'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','hospital outline') }><Icon size='big' name='hospital outline'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','heartbeat') }><Icon size='big' name='heartbeat'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','medkit') }><Icon size='big' name='medkit'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','stethoscope') }><Icon size='big' name='stethoscope'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','wheelchair') }><Icon size='big' name='wheelchair'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','camera retro') }><Icon size='big' name='camera retro'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','image') }><Icon size='big' name='image'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','tint') }><Icon size='big' name='tint'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','beer') }><Icon size='big' name='beer'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','cloud') }><Icon size='big' name='cloud'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','cog') }><Icon size='big' name='cog'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','database') }><Icon size='big' name='database'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','flag checkered') }><Icon size='big' name='flag checkered'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','heart outline') }><Icon size='big' name='heart outline'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','signal') }><Icon size='big' name='signal'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','star outline') }><Icon size='big' name='star outline'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','trophy') }><Icon size='big' name='trophy'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','shipping fast') }><Icon size='big' name='shipping fast'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','box') }><Icon size='big' name='box'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','anchor') }><Icon size='big' name='anchor'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','paw') }><Icon size='big' name='paw'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','bed') }><Icon size='big' name='bed'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','home') }><Icon size='big' name='home'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','utensils') }><Icon size='big' name='utensils'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','wrench') }><Icon size='big' name='wrench'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','key') }><Icon size='big' name='key'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','gamepad') }><Icon size='big' name='gamepad'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','puzzle') }><Icon size='big' name='puzzle'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','lock') }><Icon size='big' name='lock'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','shield alternate') }><Icon size='big' name='shield alternate'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','snowflake outline') }><Icon size='big' name='snowflake outline'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','futbol outline') }><Icon size='big' name='futbol outline'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','football ball') }><Icon size='big' name='football ball'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','cart plus') }><Icon size='big' name='cart plus'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','credit card outline') }><Icon size='big' name='credit card outline'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','graduation') }><Icon size='big' name='graduation'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','university') }><Icon size='big' name='university'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','bicycle') }><Icon size='big' name='bicycle'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','motorcycle') }><Icon size='big' name='motorcycle'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','plane') }><Icon size='big' name='plane'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','fighter jet') }><Icon size='big' name='fighter jet'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','rocket') }><Icon size='big' name='rocket'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','space shuttle') }><Icon size='big' name='space shuttle'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','ship') }><Icon size='big' name='ship'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','car') }><Icon size='big' name='car'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','taxi') }><Icon size='big' name='taxi'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','train') }><Icon size='big' name='train'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','subway') }><Icon size='big' name='subway'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','road') }><Icon size='big' name='road'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','umbrella') }><Icon size='big' name='umbrella'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','birthday cake') }><Icon size='big' name='birthday cake'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','gift') }><Icon size='big' name='gift'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','bomb') }><Icon size='big' name='bomb'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','android') }><Icon size='big' name='android'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','apple') }><Icon size='big' name='apple'/></Button>
            <Button size='tiny' onClick={() => localStorage.setItem('@FinMan/currentIcon','bitcoin') }><Icon size='big' name='bitcoin'/></Button>
        </div>
    </>
  );
};
export default App;