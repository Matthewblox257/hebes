namespace SpriteKind {
    export const Spike = SpriteKind.create()
    export const Setup = SpriteKind.create()
    export const Nothing = SpriteKind.create()
    export const Saw = SpriteKind.create()
    export const Boss = SpriteKind.create()
    export const Spout = SpriteKind.create()
    export const Shot = SpriteKind.create()
    export const Scorchup = SpriteKind.create()
    export const Cacti = SpriteKind.create()
    export const BuzzSaw = SpriteKind.create()
    export const Blurt = SpriteKind.create()
    export const Boss2 = SpriteKind.create()
    export const Hover = SpriteKind.create()
    export const Cycle = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Cacti, function (sprite, otherSprite) {
    scene.cameraShake(4, 500)
    characterAnimations.setCharacterAnimationsEnabled(mySprite, false)
    animation.runImageAnimation(
    mySprite,
    [img`
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        f . . . f . f . 
        f . . . f f f . 
        . f f f 1 f 1 . 
        . . f f f f f . 
        . f . . . f . f 
        `,img`
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        5 . . . 5 . 5 . 
        5 . . . 5 5 5 . 
        . 5 5 5 4 5 4 . 
        . . 5 5 5 5 5 . 
        . 5 . . . 5 . 5 
        `],
    50,
    true
    )
    music.play(music.createSoundEffect(
    WaveShape.Noise,
    2471,
    2313,
    600,
    0,
    200,
    SoundExpressionEffect.Vibrato,
    InterpolationCurve.Logarithmic
    ), music.PlaybackMode.InBackground)
    info.changeLifeBy(-1)
    mySprite.vy = 0
    mySprite.vy += -100
    mySprite.setFlag(SpriteFlag.GhostThroughSprites, true)
    timer.after(200, function () {
        animation.stopAnimation(animation.AnimationTypes.All, mySprite)
        mySprite.setFlag(SpriteFlag.GhostThroughSprites, false)
        characterAnimations.setCharacterAnimationsEnabled(mySprite, true)
    })
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Scorchup, function (sprite, otherSprite) {
    otherSprite.setKind(SpriteKind.Nothing)
    timer.after(300, function () {
        extraEffects.createSpreadEffectOnAnchor(otherSprite, extraEffects.createSingleColorSpreadEffectData(7, ExtraEffectPresetShape.Spark), 100)
        otherSprite.setKind(SpriteKind.Spike)
        otherSprite.setImage(img`
            . . . . . . . . 
            . . . 7 7 . . . 
            . . . 7 7 . . . 
            . . 7 6 6 7 . . 
            . . 7 6 6 7 . . 
            . 7 6 f f 6 7 . 
            . 7 6 f f 6 7 . 
            7 6 f f f f 6 7 
            `)
        music.play(music.createSong(hex`0078000408020109010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c800090000000100041314090a`), music.PlaybackMode.InBackground)
        timer.after(1000, function () {
            otherSprite.setKind(SpriteKind.Scorchup)
            otherSprite.setImage(img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . 7 7 . . . 
                . . . 7 7 . . . 
                . . 7 6 6 7 . . 
                `)
        })
    })
})
scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    if (mySprite.isHittingTile(CollisionDirection.Bottom)) {
        if (Level5Done > 0) {
            ExtraJump = 1
        }
    }
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (GameStart == 1) {
        if (mySprite.vy == 0) {
            mySprite.vy += -80
            if (PlayingLevel == 10) {
                music.play(music.createSoundEffect(
                WaveShape.Sawtooth,
                1581,
                1,
                500,
                500,
                200,
                SoundExpressionEffect.None,
                InterpolationCurve.Linear
                ), music.PlaybackMode.InBackground)
                mySprite3.vy += -80
            } else {
                music.play(music.createSoundEffect(
                WaveShape.Sawtooth,
                1,
                1553,
                500,
                500,
                200,
                SoundExpressionEffect.None,
                InterpolationCurve.Linear
                ), music.PlaybackMode.InBackground)
            }
        } else {
            if (ExtraJump == 1) {
                ExtraJump = 0
                mySprite.vy = 0
                mySprite.vy += -65
                extraEffects.createSpreadEffectOnAnchor(mySprite, extraEffects.createSingleColorSpreadEffectData(10, ExtraEffectPresetShape.Spark), 100, 24, 40)
                if (PlayingLevel == 10) {
                    music.play(music.createSoundEffect(
                    WaveShape.Sawtooth,
                    960,
                    1,
                    500,
                    500,
                    200,
                    SoundExpressionEffect.None,
                    InterpolationCurve.Linear
                    ), music.PlaybackMode.InBackground)
                    mySprite3.vy = 0
                    mySprite3.vy += -65
                } else {
                    music.play(music.createSoundEffect(
                    WaveShape.Sawtooth,
                    1,
                    2621,
                    500,
                    500,
                    200,
                    SoundExpressionEffect.None,
                    InterpolationCurve.Linear
                    ), music.PlaybackMode.InBackground)
                }
            }
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile58`, function (sprite, location) {
    if (controller.A.isPressed()) {
        timer.after(1, function () {
            tiles.setTileAt(location, assets.tile`myTile60`)
            GameStart = 0
            controller.moveSprite(mySprite, 0, 0)
            if (Perfects >= 23) {
                myMenu = miniMenu.createMenu(
                miniMenu.createMenuItem("Basic", img`
                    . f f . . f f . 
                    . f f . . f f . 
                    . f f f f f f . 
                    . f f f f f f . 
                    . 1 1 f f 1 1 . 
                    . 1 1 f f 1 1 . 
                    . f f f f f f . 
                    . f f f f f f . 
                    `),
                miniMenu.createMenuItem("Evil", img`
                    . 4 4 . . 4 4 . 
                    . 4 4 . . 4 4 . 
                    . f f f f f f . 
                    . f f f f f f . 
                    . 5 5 f f 5 5 . 
                    . 5 5 f f 5 5 . 
                    . 4 4 f f 4 4 . 
                    . 4 4 f f 4 4 . 
                    `),
                miniMenu.createMenuItem("Happy", img`
                    . 2 2 . . 2 2 . 
                    . 2 2 . . 2 2 . 
                    . 2 2 2 2 2 2 . 
                    . 2 2 2 2 2 2 . 
                    . 3 3 2 2 3 3 . 
                    . 3 3 2 2 3 3 . 
                    . 2 2 2 2 2 2 . 
                    . 2 2 2 2 2 2 . 
                    `),
                miniMenu.createMenuItem("Gloomy", img`
                    . 6 6 . . 6 6 . 
                    . 6 6 . . 6 6 . 
                    . f f 7 7 f f . 
                    . f f 7 7 f f . 
                    . 4 4 7 7 4 4 . 
                    . 4 4 7 7 4 4 . 
                    . 7 7 7 7 7 7 . 
                    . 7 7 7 7 7 7 . 
                    `),
                miniMenu.createMenuItem("Rainbow", img`
                    . 7 7 . . 3 3 . 
                    . 7 7 . . 3 3 . 
                    . 7 7 5 5 3 3 . 
                    . 7 7 5 5 3 3 . 
                    . 1 1 5 5 1 1 . 
                    . 1 1 5 5 1 1 . 
                    . 7 7 5 5 3 3 . 
                    . 7 7 5 5 3 3 . 
                    `)
                )
                myMenu.setDimensions(100, 100)
                myMenu.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Background, 11)
                myMenu.x = scene.cameraProperty(CameraProperty.X)
                myMenu.y = scene.cameraProperty(CameraProperty.Y)
            } else {
                if (Perfects >= 15) {
                    myMenu = miniMenu.createMenu(
                    miniMenu.createMenuItem("Basic", img`
                        . f f . . f f . 
                        . f f . . f f . 
                        . f f f f f f . 
                        . f f f f f f . 
                        . 1 1 f f 1 1 . 
                        . 1 1 f f 1 1 . 
                        . f f f f f f . 
                        . f f f f f f . 
                        `),
                    miniMenu.createMenuItem("Evil", img`
                        . 4 4 . . 4 4 . 
                        . 4 4 . . 4 4 . 
                        . f f f f f f . 
                        . f f f f f f . 
                        . 5 5 f f 5 5 . 
                        . 5 5 f f 5 5 . 
                        . 4 4 f f 4 4 . 
                        . 4 4 f f 4 4 . 
                        `),
                    miniMenu.createMenuItem("Happy", img`
                        . 2 2 . . 2 2 . 
                        . 2 2 . . 2 2 . 
                        . 2 2 2 2 2 2 . 
                        . 2 2 2 2 2 2 . 
                        . 3 3 2 2 3 3 . 
                        . 3 3 2 2 3 3 . 
                        . 2 2 2 2 2 2 . 
                        . 2 2 2 2 2 2 . 
                        `),
                    miniMenu.createMenuItem("Gloomy", img`
                        . 6 6 . . 6 6 . 
                        . 6 6 . . 6 6 . 
                        . f f 7 7 f f . 
                        . f f 7 7 f f . 
                        . 4 4 7 7 4 4 . 
                        . 4 4 7 7 4 4 . 
                        . 7 7 7 7 7 7 . 
                        . 7 7 7 7 7 7 . 
                        `),
                    miniMenu.createMenuItem("23 Perfects", img`
                        . e e . . b b . 
                        . e e . . b b . 
                        . e e d d b b . 
                        . e e d d b b . 
                        . 1 1 d d 1 1 . 
                        . 1 1 d d 1 1 . 
                        . e e d d b b . 
                        . e e d d b b . 
                        `)
                    )
                    myMenu.setDimensions(100, 100)
                    myMenu.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Background, 11)
                    myMenu.x = scene.cameraProperty(CameraProperty.X)
                    myMenu.y = scene.cameraProperty(CameraProperty.Y)
                } else {
                    if (Perfects >= 9) {
                        myMenu = miniMenu.createMenu(
                        miniMenu.createMenuItem("Basic", img`
                            . f f . . f f . 
                            . f f . . f f . 
                            . f f f f f f . 
                            . f f f f f f . 
                            . 1 1 f f 1 1 . 
                            . 1 1 f f 1 1 . 
                            . f f f f f f . 
                            . f f f f f f . 
                            `),
                        miniMenu.createMenuItem("Evil", img`
                            . 4 4 . . 4 4 . 
                            . 4 4 . . 4 4 . 
                            . f f f f f f . 
                            . f f f f f f . 
                            . 5 5 f f 5 5 . 
                            . 5 5 f f 5 5 . 
                            . 4 4 f f 4 4 . 
                            . 4 4 f f 4 4 . 
                            `),
                        miniMenu.createMenuItem("Happy", img`
                            . 2 2 . . 2 2 . 
                            . 2 2 . . 2 2 . 
                            . 2 2 2 2 2 2 . 
                            . 2 2 2 2 2 2 . 
                            . 3 3 2 2 3 3 . 
                            . 3 3 2 2 3 3 . 
                            . 2 2 2 2 2 2 . 
                            . 2 2 2 2 2 2 . 
                            `),
                        miniMenu.createMenuItem("15 Perfects", img`
                            . e e . . e e . 
                            . e e . . e e . 
                            . f f c c f f . 
                            . f f c c f f . 
                            . d d c c d d . 
                            . d d c c d d . 
                            . c c c c c c . 
                            . c c c c c c . 
                            `),
                        miniMenu.createMenuItem("23 Perfects", img`
                            . e e . . b b . 
                            . e e . . b b . 
                            . e e d d b b . 
                            . e e d d b b . 
                            . 1 1 d d 1 1 . 
                            . 1 1 d d 1 1 . 
                            . e e d d b b . 
                            . e e d d b b . 
                            `)
                        )
                        myMenu.setDimensions(100, 100)
                        myMenu.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Background, 11)
                        myMenu.x = scene.cameraProperty(CameraProperty.X)
                        myMenu.y = scene.cameraProperty(CameraProperty.Y)
                    } else {
                        if (Perfects >= 3) {
                            myMenu = miniMenu.createMenu(
                            miniMenu.createMenuItem("Basic", img`
                                . f f . . f f . 
                                . f f . . f f . 
                                . f f f f f f . 
                                . f f f f f f . 
                                . 1 1 f f 1 1 . 
                                . 1 1 f f 1 1 . 
                                . f f f f f f . 
                                . f f f f f f . 
                                `),
                            miniMenu.createMenuItem("Evil", img`
                                . 4 4 . . 4 4 . 
                                . 4 4 . . 4 4 . 
                                . f f f f f f . 
                                . f f f f f f . 
                                . 5 5 f f 5 5 . 
                                . 5 5 f f 5 5 . 
                                . 4 4 f f 4 4 . 
                                . 4 4 f f 4 4 . 
                                `),
                            miniMenu.createMenuItem("9 Perfects", img`
                                . d d . . d d . 
                                . d d . . d d . 
                                . d d d d d d . 
                                . d d d d d d . 
                                . b b d d b b . 
                                . b b d d b b . 
                                . d d d d d d . 
                                . d d d d d d . 
                                `),
                            miniMenu.createMenuItem("15 Perfects", img`
                                . e e . . e e . 
                                . e e . . e e . 
                                . f f c c f f . 
                                . f f c c f f . 
                                . d d c c d d . 
                                . d d c c d d . 
                                . c c c c c c . 
                                . c c c c c c . 
                                `),
                            miniMenu.createMenuItem("23 Perfects", img`
                                . e e . . b b . 
                                . e e . . b b . 
                                . e e d d b b . 
                                . e e d d b b . 
                                . 1 1 d d 1 1 . 
                                . 1 1 d d 1 1 . 
                                . e e d d b b . 
                                . e e d d b b . 
                                `)
                            )
                            myMenu.setDimensions(100, 100)
                            myMenu.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Background, 11)
                            myMenu.x = scene.cameraProperty(CameraProperty.X)
                            myMenu.y = scene.cameraProperty(CameraProperty.Y)
                        } else {
                            if (Perfects >= 0) {
                                myMenu = miniMenu.createMenu(
                                miniMenu.createMenuItem("Basic", img`
                                    . f f . . f f . 
                                    . f f . . f f . 
                                    . f f f f f f . 
                                    . f f f f f f . 
                                    . 1 1 f f 1 1 . 
                                    . 1 1 f f 1 1 . 
                                    . f f f f f f . 
                                    . f f f f f f . 
                                    `),
                                miniMenu.createMenuItem("3 Perfects", img`
                                    . d d . . d d . 
                                    . d d . . d d . 
                                    . f f f f f f . 
                                    . f f f f f f . 
                                    . c c f f c c . 
                                    . c c f f c c . 
                                    . d d f f d d . 
                                    . d d f f d d . 
                                    `),
                                miniMenu.createMenuItem("9 Perfects", img`
                                    . d d . . d d . 
                                    . d d . . d d . 
                                    . d d d d d d . 
                                    . d d d d d d . 
                                    . b b d d b b . 
                                    . b b d d b b . 
                                    . d d d d d d . 
                                    . d d d d d d . 
                                    `),
                                miniMenu.createMenuItem("15 Perfects", img`
                                    . e e . . e e . 
                                    . e e . . e e . 
                                    . f f c c f f . 
                                    . f f c c f f . 
                                    . d d c c d d . 
                                    . d d c c d d . 
                                    . c c c c c c . 
                                    . c c c c c c . 
                                    `),
                                miniMenu.createMenuItem("23 Perfects", img`
                                    . e e . . b b . 
                                    . e e . . b b . 
                                    . e e d d b b . 
                                    . e e d d b b . 
                                    . 1 1 d d 1 1 . 
                                    . 1 1 d d 1 1 . 
                                    . e e d d b b . 
                                    . e e d d b b . 
                                    `)
                                )
                                myMenu.setDimensions(100, 100)
                                myMenu.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Background, 11)
                                myMenu.x = scene.cameraProperty(CameraProperty.X)
                                myMenu.y = scene.cameraProperty(CameraProperty.Y)
                            }
                        }
                    }
                }
            }
            pause(500)
            myMenu.onButtonPressed(controller.A, function (selection, selectedIndex) {
                music.play(music.createSong(hex`00a0000408020200001c00010a006400f4016400000400000000000000000000000000050000041e0000000200011902000400011b04000600011d06000800011e08000a00012009010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c80008000000010003090a0b`), music.PlaybackMode.InBackground)
                if (selectedIndex == 3) {
                    if (Perfects >= 15) {
                        extraEffects.createSpreadEffectOnAnchor(mySprite, extraEffects.createSingleColorSpreadEffectData(6, ExtraEffectPresetShape.Spark), 100)
                        characterAnimations.loopFrames(
                        mySprite,
                        [img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            4 . . . 6 . 6 . 
                            7 . . . f 7 f . 
                            . 7 f f 4 7 4 . 
                            . . f 6 7 7 7 . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            4 . . . 6 . 6 . 
                            7 . . . f 7 f . 
                            . 7 f f 4 7 4 . 
                            . . f 6 7 7 7 . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            4 . . . 6 . 6 . 
                            7 . . . f 7 f . 
                            . 7 f f 4 7 4 . 
                            . . f 6 7 7 7 . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            4 . . . 6 . 6 . 
                            7 . . . f 7 f . 
                            . 7 f f 4 7 4 . 
                            . . f 6 7 7 7 . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            4 . . . 6 . 6 . 
                            7 . . . f 7 f . 
                            . 7 f f 4 7 4 . 
                            . . f 6 7 7 7 . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            4 . . . 6 . 6 . 
                            7 . . . f 7 f . 
                            . 7 f f 4 7 4 . 
                            . . f 6 7 7 7 . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            4 . . . 6 . 6 . 
                            7 . . . f 7 f . 
                            . 7 f f 4 7 4 . 
                            . . f 6 7 7 7 . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            4 . . . 6 . 6 . 
                            7 . . . f 7 f . 
                            . 7 f f 4 7 4 . 
                            . . f 6 7 7 7 . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            4 . . . 6 . 6 . 
                            7 . . . f 7 f . 
                            . 7 f f 4 7 4 . 
                            . . f 6 7 7 7 . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            4 . . . 6 . 6 . 
                            7 . . . f 7 f . 
                            . 7 f f 4 7 4 . 
                            . . f 6 7 7 7 . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . 6 . 6 . 
                            4 . . . f 7 f . 
                            7 . . . 4 7 4 . 
                            . 7 f f 7 7 7 . 
                            . . f 6 f 6 f . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . 6 . 6 . 
                            4 . . . f 7 f . 
                            7 . . . 4 7 4 . 
                            . 7 f f 7 7 7 . 
                            . . f 6 f 6 f . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . 6 . 6 . 
                            4 . . . f 7 f . 
                            7 . . . f 7 f . 
                            . 7 f f 7 7 7 . 
                            . . f 6 f 6 f . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . 6 . 6 . 
                            4 . . . f 7 f . 
                            7 . . . 4 7 4 . 
                            . 7 f f 7 7 7 . 
                            . . f 6 f 6 f . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . 6 . 6 . 
                            4 . . . f 7 f . 
                            7 . . . 4 7 4 . 
                            . 7 f f 7 7 7 . 
                            . . f 6 f 6 f . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . 6 . 6 . 
                            4 . . . f 7 f . 
                            7 . . . 4 7 4 . 
                            . 7 f f 7 7 7 . 
                            . . f 6 f 6 f . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . 6 . 6 . 
                            4 . . . f 7 f . 
                            7 . . . 4 7 4 . 
                            . 7 f f 7 7 7 . 
                            . . f 6 f 6 f . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . 6 . 6 . 
                            4 . . . f 7 f . 
                            7 . . . 4 7 4 . 
                            . 7 f f 7 7 7 . 
                            . . f 6 f 6 f . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            4 . . . 6 . 6 . 
                            7 . . . f 7 f . 
                            . 7 f f 4 7 4 . 
                            . . f 6 7 7 7 . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            4 . . . 6 . 6 . 
                            7 . . . f 7 f . 
                            . 7 f f 4 7 4 . 
                            . . f 6 7 7 7 . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            4 . . . 6 . 6 . 
                            7 . . . f 7 f . 
                            . 7 f f 4 7 4 . 
                            . . f 6 7 7 7 . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            4 . . . 6 . 6 . 
                            7 . . . f 7 f . 
                            . 7 f f 4 7 4 . 
                            . . f 6 7 7 7 . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            4 . . . 6 . 6 . 
                            7 . . . f 7 f . 
                            . 7 f f 4 7 4 . 
                            . . f 6 7 7 7 . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            4 . . . 6 . 6 . 
                            7 . . . f 7 f . 
                            . 7 f f 4 7 4 . 
                            . . f 6 7 7 7 . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            4 . . . 6 . 6 . 
                            7 . . . f 7 f . 
                            . 7 f f 4 7 4 . 
                            . . f 6 7 7 7 . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            4 . . . 6 . 6 . 
                            7 . . . f 7 f . 
                            . 7 f f 4 7 4 . 
                            . . f 6 7 7 7 . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            4 . . . 6 . 6 . 
                            7 . . . f 7 f . 
                            . 7 f f 4 7 4 . 
                            . . f 6 7 7 7 . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            4 . . . 6 . 6 . 
                            7 . . . f 7 f . 
                            . 7 f f 4 7 4 . 
                            . . f 6 7 7 7 . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            4 . . . 6 . 6 . 
                            7 . . . f 7 f . 
                            . 7 f f 4 7 4 . 
                            . . f 6 7 7 7 . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            4 . . . 6 . 6 . 
                            7 . . . f 7 f . 
                            . 7 f f 4 7 4 . 
                            . . f 6 7 7 7 . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . 6 . 6 . 
                            4 . . . f 7 f . 
                            7 . . f 4 7 4 . 
                            . 7 f 6 7 7 7 . 
                            . . f . f . f . 
                            . . f . . . . . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            4 . . . 6 . 6 . 
                            7 . . . f 7 f . 
                            . 7 f f 4 7 4 . 
                            . . f 6 7 7 7 . 
                            . . 5 . 5 . 5 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            4 . . . 6 . 6 . 
                            7 . . . f 7 f . 
                            . 7 f f 4 7 4 . 
                            . . 5 5 5 5 5 . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            4 . . . 6 . 6 . 
                            7 . . . f 7 f . 
                            . 5 5 5 5 5 5 . 
                            . . f f f f f . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            4 . . . 6 . 6 . 
                            5 . . . 5 5 5 . 
                            . f f f 1 f 1 . 
                            . . f f f f f . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            5 . . . 5 . 5 . 
                            f . . . f f f . 
                            . f f f 1 f 1 . 
                            . . f f f f f . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            f . . . f . f . 
                            f . . . f f f . 
                            . f f f 1 f 1 . 
                            . . f f f f f . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            f . . . f . f . 
                            f . . . f f f . 
                            . f f f 1 f 1 . 
                            . . f f f f f . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            f . . . f . f . 
                            f . . . f f f . 
                            . f f f 1 f 1 . 
                            . . f f f f f . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            f . . . f . f . 
                            f . . . f f f . 
                            . f f f 1 f f . 
                            . . f f f f f . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            f . . . f . f . 
                            f . . . f f f . 
                            . f f f 1 f 1 . 
                            . . f f f f f . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            f . . . f . f . 
                            f . . . f f f . 
                            . f f f 1 f 1 . 
                            . . f f f f f . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            f . . . f . f . 
                            f . . . f f f . 
                            . f f f 1 f 1 . 
                            . . f f f f f . 
                            . . 5 . 5 . 5 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            f . . . f . f . 
                            f . . . f f f . 
                            . f f f 1 f 1 . 
                            . . 5 5 5 5 5 . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            f . . . f . f . 
                            f . . . f f f . 
                            . 5 5 5 5 5 5 . 
                            . . f 6 7 7 7 . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            f . . . f . f . 
                            5 . . . 5 5 5 . 
                            . 7 f f 4 7 4 . 
                            . . f 6 7 7 7 . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            5 . . . 5 . 5 . 
                            7 . . . f 7 f . 
                            . 7 f f 4 7 4 . 
                            . . f 6 7 7 7 . 
                            . . f . f . f . 
                            `],
                        200,
                        characterAnimations.rule(Predicate.NotMoving)
                        )
                        characterAnimations.loopFrames(
                        mySprite,
                        [img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            . 6 . 6 . . . 4 
                            . f 7 f . . . 7 
                            . 4 7 4 f f 7 . 
                            . 7 7 7 6 f . . 
                            f . f . . . f . 
                            `],
                        200,
                        characterAnimations.rule(Predicate.MovingUp, Predicate.FacingLeft)
                        )
                        characterAnimations.loopFrames(
                        mySprite,
                        [img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . 4 . 
                            . 6 . 6 . . 7 . 
                            . f 7 f . . 7 . 
                            . 4 7 4 f f . . 
                            . 7 7 7 6 f . . 
                            f . f . f . . . 
                            `],
                        200,
                        characterAnimations.rule(Predicate.MovingDown, Predicate.FacingLeft)
                        )
                        characterAnimations.loopFrames(
                        mySprite,
                        [img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            f . . . 6 . 6 . 
                            7 . . . f 7 f . 
                            . 7 f f 4 7 4 . 
                            . . f 6 7 7 7 . 
                            . f . . . f . f 
                            `],
                        200,
                        characterAnimations.rule(Predicate.MovingUp, Predicate.FacingRight)
                        )
                        characterAnimations.loopFrames(
                        mySprite,
                        [img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . 4 . . . . . . 
                            . 7 . . 6 . 6 . 
                            . 7 . . f 7 f . 
                            . . f f 4 7 4 . 
                            . . f 6 7 7 7 . 
                            . . . f . f . f 
                            `],
                        200,
                        characterAnimations.rule(Predicate.MovingDown, Predicate.FacingRight)
                        )
                        characterAnimations.loopFrames(
                        mySprite,
                        [img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            4 . . . 6 . 6 . 
                            7 . . . f 7 f . 
                            . 7 f f 4 7 4 . 
                            . . f 6 7 7 7 . 
                            . f . . . f . f 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            4 . . . 6 . 6 . 
                            7 . . . f 7 f . 
                            . 7 f f 4 7 4 . 
                            . . f 6 7 7 7 . 
                            `],
                        200,
                        characterAnimations.rule(Predicate.MovingRight)
                        )
                        characterAnimations.loopFrames(
                        mySprite,
                        [img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            . 6 . 6 . . . 4 
                            . f 7 f . . . 7 
                            . 4 7 4 f f 7 . 
                            . 7 7 7 6 f . . 
                            f . f . . . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            . 6 . 6 . . . 4 
                            . f 7 f . . . 7 
                            . 4 7 4 f f 7 . 
                            . 7 7 7 6 f . . 
                            `],
                        200,
                        characterAnimations.rule(Predicate.MovingLeft)
                        )
                        Skin = 3
                    }
                }
                if (selectedIndex == 4) {
                    if (Perfects >= 23) {
                        extraEffects.createSpreadEffectOnAnchor(mySprite, extraEffects.createSingleColorSpreadEffectData(5, ExtraEffectPresetShape.Spark), 100)
                        extraEffects.createSpreadEffectOnAnchor(mySprite, extraEffects.createSingleColorSpreadEffectData(3, ExtraEffectPresetShape.Spark), 100)
                        extraEffects.createSpreadEffectOnAnchor(mySprite, extraEffects.createSingleColorSpreadEffectData(7, ExtraEffectPresetShape.Spark), 100)
                        characterAnimations.loopFrames(
                        mySprite,
                        [img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            3 . . . 7 . 3 . 
                            3 . . . 7 5 3 . 
                            . 7 5 3 1 5 1 . 
                            . . 5 3 7 5 3 . 
                            . . 5 . 7 . 3 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            7 . . . 5 . 7 . 
                            7 . . . 5 3 7 . 
                            . 5 3 7 1 3 1 . 
                            . . 3 7 5 3 7 . 
                            . . 3 . 5 . 7 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            5 . . . 3 . 5 . 
                            5 . . . 3 7 5 . 
                            . 3 7 5 1 7 1 . 
                            . . 7 5 3 7 5 . 
                            . . 7 . 3 . 5 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            3 . . . 7 . 3 . 
                            3 . . . 7 5 3 . 
                            . 7 5 3 1 5 1 . 
                            . . 5 3 7 5 3 . 
                            . . 5 . 7 . 3 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            7 . . . 5 . 7 . 
                            7 . . . 5 3 7 . 
                            . 5 3 7 1 3 1 . 
                            . . 3 7 5 3 7 . 
                            . . 3 . 5 . 7 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            5 . . . 3 . 5 . 
                            5 . . . 3 7 5 . 
                            . 3 7 5 1 7 1 . 
                            . . 7 5 3 7 5 . 
                            . . 7 . 3 . 5 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            3 . . . 7 . 3 . 
                            3 . . . 7 5 3 . 
                            . 7 5 3 1 5 1 . 
                            . . 5 3 7 5 3 . 
                            . . 5 . 7 . 3 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            7 . . . 5 . 7 . 
                            7 . . . 5 3 7 . 
                            . 5 3 7 5 3 7 . 
                            . . 3 7 5 3 7 . 
                            . . 3 . 5 . 7 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            5 . . . 3 . 5 . 
                            5 . . . 3 7 5 . 
                            . 3 7 5 1 7 1 . 
                            . . 7 5 3 7 5 . 
                            . . 7 . 3 . 5 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            3 . . . 7 . 3 . 
                            3 . . . 7 5 3 . 
                            . 7 5 3 1 5 1 . 
                            . . 5 3 7 5 3 . 
                            . . 5 . 7 . 3 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            7 . . . 5 . 7 . 
                            7 . . . 5 3 7 . 
                            . 5 3 7 1 3 1 . 
                            . . 3 7 5 3 7 . 
                            . . 3 . 5 . 7 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            5 . . . 3 . 5 . 
                            5 . . . 3 7 5 . 
                            . 3 7 5 1 7 1 . 
                            . . 7 5 3 7 5 . 
                            . . 7 . 3 . 5 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            3 . . . 7 . 3 . 
                            3 . . . 7 5 3 . 
                            . 7 5 3 1 5 1 . 
                            . . 5 3 7 5 3 . 
                            . . 5 . 7 . 3 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            7 . . . 5 . 7 . 
                            7 . . . 5 3 7 . 
                            . 5 3 7 1 3 1 . 
                            . . 3 7 5 3 7 . 
                            . . 3 . 5 . 7 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            5 . . . 3 . 5 . 
                            5 . . . 3 7 5 . 
                            . 3 7 5 1 7 1 . 
                            . . 7 5 3 7 5 . 
                            . . 7 . 3 . 5 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            3 . . . 7 . 3 . 
                            3 . . . 7 5 3 . 
                            . 7 5 3 1 5 1 . 
                            . . 5 3 7 5 3 . 
                            . . 5 . 7 . 3 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            7 . . . 5 . 7 . 
                            7 . . . 5 3 7 . 
                            . 5 3 7 1 3 1 . 
                            . . 3 7 5 3 7 . 
                            . . 3 . 5 . 7 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            5 . . . 3 . 5 . 
                            5 . . . 3 7 5 . 
                            . 3 7 5 1 7 1 . 
                            . . 7 5 3 7 5 . 
                            . . 7 . 3 . 5 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            3 . . . 7 . 3 . 
                            3 . . . 7 5 3 . 
                            . 7 5 3 1 5 1 . 
                            . . 5 3 7 5 3 . 
                            . . 5 . 7 . 3 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            7 . . . 5 . 7 . 
                            7 . . . 5 3 7 . 
                            . 5 3 7 1 3 1 . 
                            . . 3 7 5 3 7 . 
                            . . 3 . 5 . 7 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            5 . . . 3 . 5 . 
                            5 . . . 3 7 5 . 
                            . 3 7 5 1 7 1 . 
                            . . 7 5 3 7 5 . 
                            . . 7 . 3 . 5 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            3 . . . 7 . 3 . 
                            3 . . . 7 5 3 . 
                            . 7 5 3 1 5 1 . 
                            . . 5 3 7 5 3 . 
                            . . 5 . 7 . 3 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            7 . . . 5 . 7 . 
                            7 . . . 5 3 7 . 
                            . 5 3 7 1 3 1 . 
                            . . 3 7 5 3 7 . 
                            . . 3 . 5 . 7 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            5 . . . 3 . 5 . 
                            5 . . . 3 7 5 . 
                            . 3 7 5 1 7 1 . 
                            . . 7 5 3 7 5 . 
                            . . 7 . 3 . 5 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            3 . . . 7 . 3 . 
                            3 . . . 7 5 3 . 
                            . 7 5 3 1 5 1 . 
                            . . 5 3 7 5 3 . 
                            . . 5 . 7 . 3 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            b . . . e . b . 
                            b . . . e d b . 
                            . e d b 1 d 1 . 
                            . . d b e d b . 
                            . . d . e . b . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            b . . . e . b . 
                            b . . . e d b . 
                            . e d b 1 d 1 . 
                            . . d b e d b . 
                            . . d . e . b . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            b . . . e . b . 
                            b . . . e d b . 
                            . e d b 1 d 1 . 
                            . . d b e d b . 
                            . . d . e . b . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            b . . . e . b . 
                            b . . . e d b . 
                            . e d b 1 d 1 . 
                            . . d b e d b . 
                            . . d . e . b . 
                            `,img`
                            . 5 5 5 . . . . 
                            . . . 5 . . . . 
                            . . 5 5 . . . . 
                            b . . . e . b . 
                            b . 5 . e d b . 
                            . e d b 1 d 1 . 
                            . . d b e d b . 
                            . . d . e . b . 
                            `,img`
                            . 4 4 4 . . . . 
                            . . . 4 . . . . 
                            . . 4 4 . . . . 
                            b . . . e . b . 
                            b . 4 . e d b . 
                            . e d b 1 d 1 . 
                            . . d b e d b . 
                            . . d . e . b . 
                            `,img`
                            . 5 5 5 . . . . 
                            . . . 5 . . . . 
                            . . 5 5 . . . . 
                            b . . . e . b . 
                            b . 5 . e d b . 
                            . e d b 1 d 1 . 
                            . . d b e d b . 
                            . . d . e . b . 
                            `,img`
                            . 4 4 4 . . . . 
                            . . . 4 . . . . 
                            . . 4 4 . . . . 
                            b . . . e . b . 
                            b . 4 . e d b . 
                            . e d b 1 d 1 . 
                            . . d b e d b . 
                            . . d . e . b . 
                            `,img`
                            . 5 5 5 . . . . 
                            . . . 5 . . . . 
                            . . 5 5 . . . . 
                            b . . . e . b . 
                            b . 5 . e d b . 
                            . e d b 1 d 1 . 
                            . . d b e d b . 
                            . . d . e . b . 
                            `,img`
                            . 4 4 4 . . . . 
                            . . . 4 . . . . 
                            . . 4 4 . . . . 
                            b . . . e . b . 
                            b . 4 . e d b . 
                            . e d b 1 d 1 . 
                            . . d b e d b . 
                            . . d . e . b . 
                            `,img`
                            . 5 5 5 . . . . 
                            . . . 5 . . . . 
                            . . 5 5 . . . . 
                            b . . . e . b . 
                            b . 5 . e d b . 
                            . e d b 1 d 1 . 
                            . . d b e d b . 
                            . . d . e . b . 
                            `,img`
                            . 4 4 4 . . . . 
                            . . . 4 . . . . 
                            . . 4 4 . . . . 
                            b . . . e . b . 
                            b . 4 . e d b . 
                            . e d b 1 d 1 . 
                            . . d b e d b . 
                            . . d . e . b . 
                            `,img`
                            . 5 5 5 . . . . 
                            . . . 5 . . . . 
                            . . 5 5 . . . . 
                            b . . . e . b . 
                            b . 5 . e d b . 
                            . e d b 1 d 1 . 
                            . . d b e d b . 
                            . . d . e . b . 
                            `,img`
                            . 5 . . . . . . 
                            . . . 5 . . . . 
                            . . 5 . . . . . 
                            b . . . e . b . 
                            b . 5 . e d b . 
                            . e d b 1 d 1 . 
                            . . d b e d b . 
                            . . d . e . b . 
                            `,img`
                            . . . . . . . . 
                            . . . 5 . . . . 
                            . . 5 . . . . . 
                            b . . . e . b . 
                            b . . . e d b . 
                            . e d b 1 d 1 . 
                            . . d b e d b . 
                            . . d . e . b . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            b . . . e . b . 
                            b . . . e d b . 
                            . e d b 1 d 1 . 
                            . . d b e d b . 
                            . . d . e . b . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            3 . . . 7 . 3 . 
                            3 . . . 7 5 3 . 
                            . 7 5 3 1 5 1 . 
                            . . 5 3 7 5 3 . 
                            . . 5 . 7 . 3 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            7 . . . 5 . 7 . 
                            7 . . . 5 3 7 . 
                            . 5 3 7 1 3 1 . 
                            . . 3 7 5 3 7 . 
                            . . 3 . 5 . 7 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            5 . . . 3 . 5 . 
                            5 . . . 3 7 5 . 
                            . 3 7 5 1 7 1 . 
                            . . 7 5 3 7 5 . 
                            . . 7 . 3 . 5 . 
                            `],
                        200,
                        characterAnimations.rule(Predicate.NotMoving)
                        )
                        characterAnimations.loopFrames(
                        mySprite,
                        [img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            . 7 . 3 . . . 7 
                            . 7 5 3 . . . 7 
                            . 9 5 9 7 5 3 . 
                            . 7 5 3 7 5 . . 
                            3 . 5 . . . 3 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            . 5 . 7 . . . 5 
                            . 5 3 7 . . . 5 
                            . 9 3 9 5 3 7 . 
                            . 5 3 7 5 3 . . 
                            7 . 3 . . . 7 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            . 3 . 5 . . . 3 
                            . 3 7 5 . . . 3 
                            . 9 7 9 3 7 5 . 
                            . 3 7 5 3 7 . . 
                            5 . 7 . . . 5 . 
                            `],
                        200,
                        characterAnimations.rule(Predicate.MovingUp, Predicate.FacingLeft)
                        )
                        characterAnimations.loopFrames(
                        mySprite,
                        [img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . 3 . 
                            . 7 . 3 . . 3 . 
                            . 7 5 3 . . 3 . 
                            . 9 5 9 7 5 . . 
                            . 7 5 3 7 5 . . 
                            3 . 5 . 7 . . . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . 7 . 
                            . 5 . 7 . . 7 . 
                            . 5 3 7 . . 7 . 
                            . 9 3 9 5 3 . . 
                            . 5 3 7 5 3 . . 
                            7 . 3 . 5 . . . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . 5 . 
                            . 3 . 5 . . 5 . 
                            . 3 7 5 . . 5 . 
                            . 9 7 9 3 7 . . 
                            . 3 7 5 3 7 . . 
                            5 . 7 . 3 . . . 
                            `],
                        200,
                        characterAnimations.rule(Predicate.MovingDown, Predicate.FacingLeft)
                        )
                        characterAnimations.loopFrames(
                        mySprite,
                        [img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            7 . . . 3 . 7 . 
                            7 . . . 3 5 7 . 
                            . 3 5 7 9 5 9 . 
                            . . 5 7 3 5 7 . 
                            . 3 . . . 5 . 3 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            5 . . . 7 . 5 . 
                            5 . . . 7 3 5 . 
                            . 7 3 5 9 3 9 . 
                            . . 3 5 7 3 5 . 
                            . 7 . . . 3 . 7 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            3 . . . 5 . 3 . 
                            3 . . . 5 7 3 . 
                            . 5 7 3 9 7 9 . 
                            . . 7 3 5 7 3 . 
                            . 5 . . . 7 . 5 
                            `],
                        200,
                        characterAnimations.rule(Predicate.MovingUp, Predicate.FacingRight)
                        )
                        characterAnimations.loopFrames(
                        mySprite,
                        [img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . 3 . . . . . . 
                            . 3 . . 3 . 7 . 
                            . 3 . . 3 5 7 . 
                            . . 5 7 9 5 9 . 
                            . . 5 7 3 5 7 . 
                            . . . 7 . 5 . 3 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . 7 . . . . . . 
                            . 7 . . 7 . 5 . 
                            . 7 . . 7 3 5 . 
                            . . 3 5 9 3 9 . 
                            . . 3 5 7 3 5 . 
                            . . . 5 . 3 . 7 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . 5 . . . . . . 
                            . 5 . . 5 . 3 . 
                            . 5 . . 5 7 3 . 
                            . . 7 3 9 7 9 . 
                            . . 7 3 5 7 3 . 
                            . . . 3 . 7 . 5 
                            `],
                        200,
                        characterAnimations.rule(Predicate.MovingDown, Predicate.FacingRight)
                        )
                        characterAnimations.loopFrames(
                        mySprite,
                        [img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            7 . . . 3 . 7 . 
                            7 . . . 3 5 7 . 
                            . 3 5 7 1 5 1 . 
                            . . 5 7 3 5 7 . 
                            . 3 . . . 5 . 3 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            3 . . . 5 . 3 . 
                            3 . . . 5 7 3 . 
                            . 5 7 3 1 7 1 . 
                            . . 7 3 5 7 3 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            5 . . . 7 . 5 . 
                            5 . . . 7 3 5 . 
                            . 7 3 5 1 3 1 . 
                            . . 3 5 7 3 5 . 
                            . 7 . . . 3 . 7 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            7 . . . 3 . 7 . 
                            7 . . . 3 5 7 . 
                            . 3 5 7 1 5 1 . 
                            . . 5 7 3 5 7 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            3 . . . 5 . 3 . 
                            3 . . . 5 7 3 . 
                            . 5 7 3 1 7 1 . 
                            . . 7 3 5 7 3 . 
                            . 5 . . . 7 . 5 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            5 . . . 7 . 5 . 
                            5 . . . 7 3 5 . 
                            . 7 3 5 1 3 1 . 
                            . . 3 5 7 3 5 . 
                            `],
                        200,
                        characterAnimations.rule(Predicate.MovingRight)
                        )
                        characterAnimations.loopFrames(
                        mySprite,
                        [img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            . 7 . 3 . . . 7 
                            . 7 5 3 . . . 7 
                            . 1 5 1 7 5 3 . 
                            . 7 5 3 7 5 . . 
                            3 . 5 . . . 3 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            . 3 . 5 . . . 3 
                            . 3 7 5 . . . 3 
                            . 1 7 1 3 7 5 . 
                            . 3 7 5 3 7 . . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            . 5 . 7 . . . 5 
                            . 5 3 7 . . . 5 
                            . 1 3 1 5 3 7 . 
                            . 5 3 7 5 3 . . 
                            7 . 3 . . . 7 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            . 7 . 3 . . . 7 
                            . 7 5 3 . . . 7 
                            . 1 5 1 7 5 3 . 
                            . 7 5 3 7 5 . . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            . 3 . 5 . . . 3 
                            . 3 7 5 . . . 3 
                            . 1 7 1 3 7 5 . 
                            . 3 7 5 3 7 . . 
                            5 . 7 . . . 5 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            . 5 . 7 . . . 5 
                            . 5 3 7 . . . 5 
                            . 1 3 1 5 3 7 . 
                            . 5 3 7 5 3 . . 
                            `],
                        200,
                        characterAnimations.rule(Predicate.MovingLeft)
                        )
                        Skin = 4
                    }
                }
                if (selectedIndex == 2) {
                    if (Perfects >= 9) {
                        extraEffects.createSpreadEffectOnAnchor(mySprite, extraEffects.createSingleColorSpreadEffectData(3, ExtraEffectPresetShape.Spark), 100)
                        characterAnimations.loopFrames(
                        mySprite,
                        [img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            2 . . . 2 . 2 . 
                            2 . . . 2 2 2 . 
                            . 2 2 2 9 2 9 . 
                            . . 2 2 2 2 2 . 
                            . . 2 . 2 . 2 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            2 . . . 2 . 3 . 
                            2 . . . 2 2 3 . 
                            . 2 2 2 9 2 9 . 
                            . . 2 2 2 2 3 . 
                            . . 2 . 2 . 3 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            2 . . . 2 . 2 . 
                            2 . . . 2 3 2 . 
                            . 2 2 2 9 3 9 . 
                            . . 2 2 2 3 2 . 
                            . . 2 . 2 . 2 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            2 . . . 3 . 2 . 
                            2 . . . 3 2 2 . 
                            . 2 2 2 9 2 9 . 
                            . . 2 2 3 2 2 . 
                            . . 2 . 3 . 2 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            2 . . . 2 . 2 . 
                            2 . . . 2 2 2 . 
                            . 2 2 3 9 2 9 . 
                            . . 2 3 2 2 2 . 
                            . . 2 . 2 . 2 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            2 . . . 2 . 2 . 
                            2 . . . 2 2 2 . 
                            . 2 3 2 9 2 9 . 
                            . . 3 2 2 2 2 . 
                            . . 3 . 2 . 2 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            2 . . . 2 . 2 . 
                            2 . . . 2 2 2 . 
                            . 3 2 2 9 2 9 . 
                            . . 2 2 2 2 2 . 
                            . . 2 . 2 . 2 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            3 . . . 2 . 2 . 
                            3 . . . 2 2 2 . 
                            . 2 2 2 9 2 9 . 
                            . . 2 2 2 2 2 . 
                            . . 2 . 2 . 2 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            2 . . . 2 . 2 . 
                            2 . . . 2 2 2 . 
                            . 2 2 2 9 2 9 . 
                            . . 2 2 2 2 2 . 
                            . . 2 . 2 . 2 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            2 . . . 2 . 3 . 
                            2 . . . 2 2 3 . 
                            . 2 2 2 9 2 9 . 
                            . . 2 2 2 2 3 . 
                            . . 2 . 2 . 3 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            2 . . . 2 . 2 . 
                            2 . . . 2 3 2 . 
                            . 2 2 2 9 3 9 . 
                            . . 2 2 2 3 2 . 
                            . . 2 . 2 . 2 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            2 . . . 3 . 2 . 
                            2 . . . 3 2 2 . 
                            . 2 2 2 9 2 9 . 
                            . . 2 2 3 2 2 . 
                            . . 2 . 3 . 2 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            2 . . . 2 . 2 . 
                            2 . . . 2 2 2 . 
                            . 2 2 3 9 2 9 . 
                            . . 2 3 2 2 2 . 
                            . . 2 . 2 . 2 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            2 . . . 2 . 2 . 
                            2 . . . 2 2 2 . 
                            . 2 3 2 9 2 9 . 
                            . . 3 2 2 2 2 . 
                            . . 3 . 2 . 2 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            2 . . . 2 . 2 . 
                            2 . . . 2 2 2 . 
                            . 3 2 2 9 2 9 . 
                            . . 2 2 2 2 2 . 
                            . . 2 . 2 . 2 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            3 . . . 2 . 2 . 
                            3 . . . 2 2 2 . 
                            . 2 2 2 9 2 9 . 
                            . . 2 2 2 2 2 . 
                            . . 2 . 2 . 2 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            2 . . . 2 . 2 . 
                            2 . . . 2 2 2 . 
                            . 2 2 2 9 2 9 . 
                            . . 2 2 2 2 2 . 
                            . . 2 . 2 . 2 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            2 . . . 2 . 3 . 
                            2 . . . 2 2 3 . 
                            . 2 2 2 9 2 9 . 
                            . . 2 2 2 2 3 . 
                            . . 2 . 2 . 3 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            2 . . . 2 . 2 . 
                            2 . . . 2 3 2 . 
                            . 2 2 2 9 3 9 . 
                            . . 2 2 2 3 2 . 
                            . . 2 . 2 . 2 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            2 . . . 3 . 2 . 
                            2 . . . 3 2 2 . 
                            . 2 2 2 9 2 9 . 
                            . . 2 2 3 2 2 . 
                            . . 2 . 3 . 2 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            2 . . . 2 . 2 . 
                            2 . . . 2 2 2 . 
                            . 2 2 3 9 2 9 . 
                            . . 2 3 2 2 2 . 
                            . . 2 . 2 . 2 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            2 . . . 2 . 2 . 
                            2 . . . 2 2 2 . 
                            . 2 3 2 9 2 9 . 
                            . . 3 2 2 2 2 . 
                            . . 3 . 2 . 2 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            2 . . . 2 . 2 . 
                            2 . . . 2 2 2 . 
                            . 3 2 2 9 2 9 . 
                            . . 2 2 2 2 2 . 
                            . . 2 . 2 . 2 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            3 . . . 2 . 2 . 
                            3 . . . 2 2 2 . 
                            . 2 2 2 9 2 9 . 
                            . . 2 2 2 2 2 . 
                            . . 2 . 2 . 2 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            2 . . . 2 . 2 . 
                            2 . . . 2 2 2 . 
                            . 2 2 2 9 2 9 . 
                            . . 2 2 2 2 2 . 
                            . . 2 . 2 . 2 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            2 . . . 2 . 2 . 
                            2 . . . 2 2 2 . 
                            . 2 2 2 2 2 2 . 
                            . . 2 2 2 2 2 . 
                            . . 2 . 2 . 2 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            2 . . . 2 . 2 . 
                            2 . . . 2 2 2 . 
                            . 2 2 2 2 2 2 . 
                            . . 2 2 2 2 2 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            2 . . . 2 . 2 . 
                            2 . . . 2 2 2 . 
                            . 2 2 2 2 2 2 . 
                            . . 2 2 2 2 2 . 
                            `,img`
                            . 4 4 4 . . . . 
                            . . 4 4 . . . . 
                            . 4 4 . . . . . 
                            . 4 4 4 . . . . 
                            2 . . . 2 . 3 . 
                            2 . . . 2 2 3 . 
                            . 2 2 2 2 2 3 . 
                            . . 2 2 2 2 3 . 
                            `,img`
                            . 4 4 4 . . . . 
                            . . 4 4 . . . . 
                            . 4 4 . . . . . 
                            . 4 4 4 . . . . 
                            2 . . . 2 . 2 . 
                            2 . . . 2 3 2 . 
                            . 2 2 2 2 3 2 . 
                            . . 2 2 2 3 2 . 
                            `,img`
                            . 5 5 5 . . . . 
                            . . 5 5 . . . . 
                            . 5 5 . . . . . 
                            . 5 5 5 . . . . 
                            2 . . . 3 . 2 . 
                            2 . . . 3 2 2 . 
                            . 2 2 2 3 2 2 . 
                            . . 2 2 3 2 2 . 
                            `,img`
                            . 4 4 4 . . . . 
                            . . 4 4 . . . . 
                            . 4 4 . . . . . 
                            . 4 4 4 . . . . 
                            2 . . . 2 . 2 . 
                            2 . . . 2 2 2 . 
                            . 2 2 3 2 2 2 . 
                            . . 2 3 2 2 2 . 
                            `,img`
                            . 5 5 5 . . . . 
                            . . 5 5 . . . . 
                            . 5 5 . . . . . 
                            . 5 5 5 . . . . 
                            2 . . . 2 . 2 . 
                            2 . . . 2 2 2 . 
                            . 2 3 2 2 2 2 . 
                            . . 3 2 2 2 2 . 
                            `,img`
                            . 4 4 4 . . . . 
                            . . 4 4 . . . . 
                            . 4 4 . . . . . 
                            . 4 4 4 . . . . 
                            2 . . . 2 . 2 . 
                            2 . . . 2 2 2 . 
                            . 3 2 2 2 2 2 . 
                            . . 2 2 2 2 2 . 
                            `,img`
                            . 5 5 5 . . . . 
                            . . 5 5 . . . . 
                            . 5 5 . . . . . 
                            . 5 5 5 . . . . 
                            3 . . . 2 . 2 . 
                            3 . . . 2 2 2 . 
                            . 2 2 2 2 2 2 . 
                            . . 2 2 2 2 2 . 
                            `,img`
                            . 4 4 4 . . . . 
                            . . 4 4 . . . . 
                            . 4 4 . . . . . 
                            . 4 4 4 . . . . 
                            2 . . . 2 . 3 . 
                            2 . . . 2 2 3 . 
                            . 2 2 2 2 2 3 . 
                            . . 2 2 2 2 3 . 
                            `,img`
                            . 5 5 5 . . . . 
                            . . 5 5 . . . . 
                            . 5 5 . . . . . 
                            . 5 5 5 . . . . 
                            2 . . . 2 . 2 . 
                            2 . . . 2 3 2 . 
                            . 2 2 2 2 3 2 . 
                            . . 2 2 2 3 2 . 
                            `,img`
                            . 4 4 4 . . . . 
                            . . 4 4 . . . . 
                            . 4 4 . . . . . 
                            . 4 4 4 . . . . 
                            2 . . . 3 . 2 . 
                            2 . . . 3 2 2 . 
                            . 2 2 2 3 2 2 . 
                            . . 2 2 3 2 2 . 
                            `,img`
                            . 5 5 5 . . . . 
                            . . 5 5 . . . . 
                            . 5 5 . . . . . 
                            . 5 5 5 . . . . 
                            2 . . . 2 . 2 . 
                            2 . . . 2 2 2 . 
                            . 2 2 3 2 2 2 . 
                            . . 2 3 2 2 2 . 
                            `,img`
                            . . 5 . . . . . 
                            . . . 5 . . . . 
                            . . 5 . . . . . 
                            . 5 . 5 . . . . 
                            2 . . . 2 . 2 . 
                            2 . . . 2 2 2 . 
                            . 2 3 2 2 2 2 . 
                            . . 3 2 2 2 2 . 
                            `,img`
                            . . . . . . . . 
                            . . . 5 . . . . 
                            . . 5 . . . . . 
                            . . . . . . . . 
                            2 . . . 2 . 2 . 
                            2 . . . 2 2 2 . 
                            . 3 2 2 2 2 2 . 
                            . . 2 2 2 2 2 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            3 . . . 2 . 2 . 
                            3 . . . 2 2 2 . 
                            . 2 2 2 9 2 9 . 
                            . . 2 2 2 2 2 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            2 . . . 2 . 2 . 
                            2 . . . 2 2 2 . 
                            . 2 2 2 9 2 9 . 
                            . . 2 2 2 2 2 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            2 . . . 2 . 2 . 
                            2 . . . 2 2 2 . 
                            . 2 2 2 9 2 9 . 
                            . . 2 2 2 2 2 . 
                            . . 2 . 2 . 2 . 
                            `],
                        200,
                        characterAnimations.rule(Predicate.NotMoving)
                        )
                        characterAnimations.loopFrames(
                        mySprite,
                        [img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            . 2 . 2 . . . 2 
                            . 2 2 2 . . . 2 
                            . 9 2 9 2 2 2 . 
                            . 2 2 2 2 2 . . 
                            2 . 2 . . . 2 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            . 2 . 2 . . . 3 
                            . 2 2 2 . . . 3 
                            . 9 2 9 2 2 2 . 
                            . 2 2 2 2 2 . . 
                            2 . 2 . . . 2 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            . 2 . 2 . . . 2 
                            . 2 2 2 . . . 2 
                            . 9 2 9 2 2 3 . 
                            . 2 2 2 2 2 . . 
                            2 . 2 . . . 3 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            . 2 . 2 . . . 2 
                            . 2 2 2 . . . 2 
                            . 9 2 9 2 3 2 . 
                            . 2 2 2 2 3 . . 
                            2 . 2 . . . 2 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            . 2 . 2 . . . 2 
                            . 2 2 2 . . . 2 
                            . 9 2 9 3 2 2 . 
                            . 2 2 2 3 2 . . 
                            2 . 2 . . . 2 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            . 2 . 3 . . . 2 
                            . 2 2 3 . . . 2 
                            . 9 2 9 2 2 2 . 
                            . 2 2 3 2 2 . . 
                            2 . 2 . . . 2 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            . 2 . 2 . . . 2 
                            . 2 3 2 . . . 2 
                            . 9 3 9 2 2 2 . 
                            . 2 3 2 2 2 . . 
                            2 . 3 . . . 2 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            . 3 . 2 . . . 2 
                            . 3 2 2 . . . 2 
                            . 9 2 9 2 2 2 . 
                            . 3 2 2 2 2 . . 
                            2 . 2 . . . 2 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            . 2 . 2 . . . 2 
                            . 2 2 2 . . . 2 
                            . 9 2 9 2 2 2 . 
                            . 2 2 2 2 2 . . 
                            3 . 2 . . . 2 . 
                            `],
                        200,
                        characterAnimations.rule(Predicate.MovingUp, Predicate.FacingLeft)
                        )
                        characterAnimations.loopFrames(
                        mySprite,
                        [img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . 3 . 
                            . 2 . 2 . . 3 . 
                            . 2 2 2 . . 3 . 
                            . 9 2 9 2 2 . . 
                            . 2 2 2 2 2 . . 
                            2 . 2 . 2 . . . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . 2 . 
                            . 2 . 2 . . 2 . 
                            . 2 2 2 . . 2 . 
                            . 9 2 9 2 3 . . 
                            . 2 2 2 2 3 . . 
                            2 . 2 . 2 . . . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . 2 . 
                            . 2 . 2 . . 2 . 
                            . 2 2 2 . . 2 . 
                            . 9 2 9 3 2 . . 
                            . 2 2 2 3 2 . . 
                            2 . 2 . 3 . . . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . 2 . 
                            . 2 . 3 . . 2 . 
                            . 2 2 3 . . 2 . 
                            . 9 2 9 2 2 . . 
                            . 2 2 3 2 2 . . 
                            2 . 2 . 2 . . . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . 2 . 
                            . 2 . 2 . . 2 . 
                            . 2 3 2 . . 2 . 
                            . 9 3 9 2 2 . . 
                            . 2 3 2 2 2 . . 
                            2 . 3 . 2 . . . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . 2 . 
                            . 3 . 2 . . 2 . 
                            . 3 2 2 . . 2 . 
                            . 9 2 9 2 2 . . 
                            . 3 2 2 2 2 . . 
                            2 . 2 . 2 . . . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . 2 . 
                            . 2 . 2 . . 2 . 
                            . 2 2 2 . . 2 . 
                            . 9 2 9 2 2 . . 
                            . 2 2 2 2 2 . . 
                            3 . 2 . 2 . . . 
                            `],
                        200,
                        characterAnimations.rule(Predicate.MovingDown, Predicate.FacingLeft)
                        )
                        characterAnimations.loopFrames(
                        mySprite,
                        [img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            2 . . . 2 . 2 . 
                            2 . . . 2 2 2 . 
                            . 2 2 2 9 2 9 . 
                            . . 2 2 2 2 2 . 
                            . 2 . . . 2 . 2 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            3 . . . 2 . 2 . 
                            3 . . . 2 2 2 . 
                            . 2 2 2 9 2 9 . 
                            . . 2 2 2 2 2 . 
                            . 2 . . . 2 . 2 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            2 . . . 2 . 2 . 
                            2 . . . 2 2 2 . 
                            . 3 2 2 9 2 9 . 
                            . . 2 2 2 2 2 . 
                            . 3 . . . 2 . 2 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            2 . . . 2 . 2 . 
                            2 . . . 2 2 2 . 
                            . 2 3 2 9 2 9 . 
                            . . 3 2 2 2 2 . 
                            . 2 . . . 2 . 2 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            2 . . . 2 . 2 . 
                            2 . . . 2 2 2 . 
                            . 2 2 3 9 2 9 . 
                            . . 2 3 2 2 2 . 
                            . 2 . . . 2 . 2 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            2 . . . 3 . 2 . 
                            2 . . . 3 2 2 . 
                            . 2 2 2 9 2 9 . 
                            . . 2 2 3 2 2 . 
                            . 2 . . . 2 . 2 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            2 . . . 2 . 2 . 
                            2 . . . 2 3 2 . 
                            . 2 2 2 9 3 9 . 
                            . . 2 2 2 3 2 . 
                            . 2 . . . 3 . 2 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            2 . . . 2 . 3 . 
                            2 . . . 2 2 3 . 
                            . 2 2 2 9 2 9 . 
                            . . 2 2 2 2 3 . 
                            . 2 . . . 2 . 2 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            2 . . . 2 . 2 . 
                            2 . . . 2 2 2 . 
                            . 2 2 2 9 2 9 . 
                            . . 2 2 2 2 2 . 
                            . 2 . . . 2 . 3 
                            `],
                        200,
                        characterAnimations.rule(Predicate.MovingUp, Predicate.FacingRight)
                        )
                        characterAnimations.loopFrames(
                        mySprite,
                        [img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . 3 . . . . . . 
                            . 3 . . 2 . 2 . 
                            . 3 . . 2 2 2 . 
                            . . 2 2 9 2 9 . 
                            . . 2 2 2 2 2 . 
                            . . . 2 . 2 . 2 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . 2 . . . . . . 
                            . 2 . . 2 . 2 . 
                            . 2 . . 2 2 2 . 
                            . . 3 2 9 2 9 . 
                            . . 3 2 2 2 2 . 
                            . . . 2 . 2 . 2 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . 2 . . . . . . 
                            . 2 . . 2 . 2 . 
                            . 2 . . 2 2 2 . 
                            . . 2 3 9 2 9 . 
                            . . 2 3 2 2 2 . 
                            . . . 3 . 2 . 2 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . 2 . . . . . . 
                            . 2 . . 3 . 2 . 
                            . 2 . . 3 2 2 . 
                            . . 2 2 9 2 9 . 
                            . . 2 2 3 2 2 . 
                            . . . 2 . 2 . 2 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . 2 . . . . . . 
                            . 2 . . 2 . 2 . 
                            . 2 . . 2 3 2 . 
                            . . 2 2 9 3 9 . 
                            . . 2 2 2 3 2 . 
                            . . . 2 . 3 . 2 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . 2 . . . . . . 
                            . 2 . . 2 . 3 . 
                            . 2 . . 2 2 3 . 
                            . . 2 2 9 2 9 . 
                            . . 2 2 2 2 3 . 
                            . . . 2 . 2 . 2 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . 2 . . . . . . 
                            . 2 . . 2 . 2 . 
                            . 2 . . 2 2 2 . 
                            . . 2 2 9 2 9 . 
                            . . 2 2 2 2 2 . 
                            . . . 2 . 2 . 3 
                            `],
                        200,
                        characterAnimations.rule(Predicate.MovingDown, Predicate.FacingRight)
                        )
                        characterAnimations.loopFrames(
                        mySprite,
                        [img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            3 . . . 3 . 2 . 
                            3 . . . 3 3 2 . 
                            . 3 2 2 9 3 9 . 
                            . . 2 2 3 3 2 . 
                            . 3 . . . 3 . 2 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            2 . . . 2 . 3 . 
                            2 . . . 2 2 3 . 
                            . 2 3 3 9 2 9 . 
                            . . 3 3 2 2 3 . 
                            `],
                        200,
                        characterAnimations.rule(Predicate.MovingRight)
                        )
                        characterAnimations.loopFrames(
                        mySprite,
                        [img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            . 2 . 3 . . . 3 
                            . 2 3 3 . . . 3 
                            . 9 3 9 2 2 3 . 
                            . 2 3 3 2 2 . . 
                            2 . 3 . . . 3 . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            . 3 . 2 . . . 2 
                            . 3 2 2 . . . 2 
                            . 9 2 9 3 3 2 . 
                            . 3 2 2 3 3 . . 
                            `],
                        200,
                        characterAnimations.rule(Predicate.MovingLeft)
                        )
                        Skin = 2
                    }
                }
                if (selectedIndex == 1) {
                    if (Perfects >= 3) {
                        extraEffects.createSpreadEffectOnAnchor(mySprite, extraEffects.createSingleColorSpreadEffectData(4, ExtraEffectPresetShape.Spark), 100)
                        characterAnimations.loopFrames(
                        mySprite,
                        [img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            5 . . . 4 . 4 . 
                            5 . . . f f f . 
                            . 5 f f 5 f 5 . 
                            . . f f 4 f 4 . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            5 . . . 4 . 4 . 
                            5 . . . f f f . 
                            . 5 f f 5 f 5 . 
                            . . f f 4 f 4 . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            5 . . . 4 . 4 . 
                            5 . . . f f f . 
                            . 5 f f 5 f 5 . 
                            . . f f 4 f 4 . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            5 . . . 4 . 4 . 
                            5 . . . f f f . 
                            . 5 f f 5 f 5 . 
                            . . f f 4 f 4 . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            5 . . . 4 . 4 . 
                            5 . . . f f f . 
                            . 5 f f 5 f 5 . 
                            . . f f 4 f 4 . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            5 . . . 4 . 4 . 
                            5 . . . f f f . 
                            . 5 f f 5 f 5 . 
                            . . f f 4 f 4 . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            5 . . . 4 . 4 . 
                            5 . . . f f f . 
                            . 5 f f 5 f 5 . 
                            . . f f 4 f 4 . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            5 . . . 4 . 4 . 
                            5 . . . f f f . 
                            . 5 f f 5 f 5 . 
                            . . f f 4 f 4 . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            5 . . . 4 . 4 . 
                            5 . . . f f f . 
                            . 5 f f 5 f 5 . 
                            . . f f 4 f 4 . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            5 . . . 4 . 4 . 
                            5 . . . f f f . 
                            . 5 f f 5 f 5 . 
                            . . f f 4 f 4 . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            5 . . . 4 . 4 . 
                            5 . . . f f f . 
                            . 5 f f 1 f 1 . 
                            . . f f 4 f 4 . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            5 . . . 4 . 4 . 
                            5 . . . f f f . 
                            . 5 f f 5 f 5 . 
                            . . f f 4 f 4 . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            5 . . . 4 . 4 . 
                            5 . . . f f f . 
                            . 5 f f 1 f 1 . 
                            . . f f 4 f 4 . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            5 . . . 4 . 4 . 
                            5 . . . f f f . 
                            . 5 f f 5 f 5 . 
                            . . f f 4 f 4 . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            5 . . . 4 . 4 . 
                            5 . . . f f f . 
                            . 5 f f 1 f 1 . 
                            . . f f 4 f 4 . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            5 . . . 4 . 4 . 
                            5 . . . f f f . 
                            . 5 f f 5 f 5 . 
                            . . f f 4 f 4 . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            5 . . . 4 . 4 . 
                            5 . . . f f f . 
                            . 5 f f 5 f 5 . 
                            . . f f 4 f 4 . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            5 . . . 4 . 4 . 
                            5 . . . f f f . 
                            . 5 f f 5 f 5 . 
                            . . f f 4 f 4 . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            5 . . . 4 . 4 . 
                            5 . . . f f f . 
                            . 5 f f 5 f 5 . 
                            . . f f 4 f 4 . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            5 . . . 4 . 4 . 
                            5 . . . f f f . 
                            . 5 f f 5 f 5 . 
                            . . f f 4 f 4 . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            5 . . . 4 . 4 . 
                            5 . . . f f f . 
                            . 5 f f 5 f 5 . 
                            . . f f 4 f 4 . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            5 . . . 4 . 4 . 
                            5 . . . f f f . 
                            . 5 f f 5 f 5 . 
                            . . f f 4 f 4 . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            5 . . . 4 . 4 . 
                            5 . . . f f f . 
                            . 5 f f 5 f 5 . 
                            . . f f 4 f 4 . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            5 . . . 4 . 4 . 
                            5 . . . f f f . 
                            . 5 f f 5 f 5 . 
                            . . f f 4 f 4 . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            5 . . . 4 . 4 . 
                            5 . . . f f f . 
                            . 5 f f 5 f 5 . 
                            . . f f 4 f 4 . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            5 . . . 4 . 4 . 
                            5 . . . f f f . 
                            . 5 f f 5 f 5 . 
                            . . f f 4 f 4 . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            5 . . . 4 . 4 . 
                            5 . . . f f f . 
                            . 5 f f 5 f 5 . 
                            . . f f 4 f 4 . 
                            . . e . e . e . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            5 . . . 4 . 4 . 
                            5 . . . f f f . 
                            . 5 f f 5 f 5 . 
                            . . f f 4 f 4 . 
                            . . e . e . e . 
                            . . e . e . e . 
                            . . f . f . f . 
                            `,img`
                            5 . . . 4 . 4 . 
                            5 . . . f f f . 
                            . 5 f f 5 f 5 . 
                            . . f f 4 f 4 . 
                            . . e . e . e . 
                            . . e . e . e . 
                            . . e . e . e . 
                            . . f . f . f . 
                            `,img`
                            5 . . . 4 . 4 . 
                            5 . . . f f f . 
                            . 5 f f 5 f 5 . 
                            . . f f 4 f 4 . 
                            . . e . e . e . 
                            . . e . e . e . 
                            . . e . e . e . 
                            . . 4 . f . f . 
                            `,img`
                            5 . . . 4 . 4 . 
                            5 . . . f f f . 
                            . 5 f f 5 f 5 . 
                            . . f f 4 f 4 . 
                            . . e . e . e . 
                            . . e . e . e . 
                            . . e . e . e . 
                            . . f . 4 . f . 
                            `,img`
                            5 . . . 4 . 4 . 
                            5 . . . f f f . 
                            . 5 f f 5 f 5 . 
                            . . f f 4 f 4 . 
                            . . e . e . e . 
                            . . e . e . e . 
                            . . e . e . e . 
                            . . f . f . 4 . 
                            `,img`
                            5 . . . 4 . 4 . 
                            5 . . . f f f . 
                            . 5 f f 5 f 5 . 
                            . . f f 4 f 4 . 
                            . . e . e . e . 
                            . . e . e . e . 
                            . . e . e . e . 
                            . . 4 . f . f . 
                            `,img`
                            5 . . . 4 . 4 . 
                            5 . . . f f f . 
                            . 5 f f 5 f 5 . 
                            . . f f 4 f 4 . 
                            . . e . e . e . 
                            . . e . e . e . 
                            . . e . e . e . 
                            . . f . 4 . f . 
                            `,img`
                            5 . . . 4 . 4 . 
                            5 . . . f f f . 
                            . 5 f f 5 f 5 . 
                            . . f f 4 f 4 . 
                            . . e . e . e . 
                            . . e . e . e . 
                            . . e . e . e . 
                            . . f . f . 4 . 
                            `,img`
                            5 . . . 4 . 4 . 
                            5 . . . f f f . 
                            . 5 f f 5 f 5 . 
                            . . f f 4 f 4 . 
                            . . e . e . e . 
                            . . e . e . e . 
                            . . e . e . e . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            5 . . . 4 . 4 . 
                            5 . . . f f f . 
                            . 5 f f 5 f 5 . 
                            . . f f 4 f 4 . 
                            . . e . e . e . 
                            . . e . e . e . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            5 . . . 4 . 4 . 
                            5 . . . f f f . 
                            . 5 f f 5 f 5 . 
                            . . f f 4 f 4 . 
                            . . e . e . e . 
                            . . e . e . e . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            5 . . . 4 . 4 . 
                            5 . . . f f f . 
                            . 5 f f 5 f 5 . 
                            . . f f 4 f 4 . 
                            . . e . e . e . 
                            . . f . f . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            5 . . . 4 . 4 . 
                            5 . . . f f f . 
                            . 5 f f 5 f 5 . 
                            . . f f 4 f 4 . 
                            . . f . f . f . 
                            `],
                        200,
                        characterAnimations.rule(Predicate.NotMoving)
                        )
                        characterAnimations.loopFrames(
                        mySprite,
                        [img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            . 4 . 4 . . . 5 
                            . f f f . . . 5 
                            . 5 f 5 f f 5 . 
                            . 4 f 4 f f . . 
                            f . f . . . f . 
                            `],
                        200,
                        characterAnimations.rule(Predicate.MovingUp, Predicate.FacingLeft)
                        )
                        characterAnimations.loopFrames(
                        mySprite,
                        [img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . 5 . 
                            . 4 . 4 . . 5 . 
                            . f f f . . 5 . 
                            . 5 f 5 f f . . 
                            . 4 f 4 f f . . 
                            f . f . f . . . 
                            `],
                        200,
                        characterAnimations.rule(Predicate.MovingDown, Predicate.FacingLeft)
                        )
                        characterAnimations.loopFrames(
                        mySprite,
                        [img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            5 . . . 4 . 4 . 
                            5 . . . f f f . 
                            . 5 f f 5 f 5 . 
                            . . f f 4 f 4 . 
                            . f . . . f . f 
                            `],
                        200,
                        characterAnimations.rule(Predicate.MovingUp, Predicate.FacingRight)
                        )
                        characterAnimations.loopFrames(
                        mySprite,
                        [img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . 5 . . . . . . 
                            . 5 . . 4 . 4 . 
                            . 5 . . f f f . 
                            . . f f 5 f 5 . 
                            . . f f 4 f 4 . 
                            . . . f . f . f 
                            `],
                        200,
                        characterAnimations.rule(Predicate.MovingDown, Predicate.FacingRight)
                        )
                        characterAnimations.loopFrames(
                        mySprite,
                        [img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            5 . . . 4 . 4 . 
                            5 . . . f f f . 
                            . 5 f f 5 f 5 . 
                            . . f f 4 f 4 . 
                            . f . . . f . f 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            5 . . . 4 . 4 . 
                            5 . . . f f f . 
                            . 5 f f 5 f 5 . 
                            . . f f 4 f 4 . 
                            `],
                        200,
                        characterAnimations.rule(Predicate.MovingRight)
                        )
                        characterAnimations.loopFrames(
                        mySprite,
                        [img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            . 4 . 4 . . . 5 
                            . f f f . . . 5 
                            . 5 f 5 f f 5 . 
                            . 4 f 4 f f . . 
                            f . f . . . f . 
                            `,img`
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            . . . . . . . . 
                            . 4 . 4 . . . 5 
                            . f f f . . . 5 
                            . 5 f 5 f f 5 . 
                            . 4 f 4 f f . . 
                            `],
                        200,
                        characterAnimations.rule(Predicate.MovingLeft)
                        )
                        Skin = 1
                    }
                }
                if (selectedIndex == 0) {
                    extraEffects.createSpreadEffectOnAnchor(mySprite, extraEffects.createSingleColorSpreadEffectData(14, ExtraEffectPresetShape.Spark), 100)
                    characterAnimations.loopFrames(
                    mySprite,
                    [img`
                        . . . . . . . . 
                        . . . . . . . . 
                        . . . . . . . . 
                        f . . . f . f . 
                        f . . . f f f . 
                        . f f f 1 f 1 . 
                        . . f f f f f . 
                        . . f . f . f . 
                        `,img`
                        . . . . . . . . 
                        . . . . . . . . 
                        . . . . . . . . 
                        f . . . f . f . 
                        f . . . f f f . 
                        . f f f 1 f 1 . 
                        . . f f f f f . 
                        . . f . f . f . 
                        `,img`
                        . . . . . . . . 
                        . . . . . . . . 
                        . . . . . . . . 
                        f . . . f . f . 
                        f . . . f f f . 
                        . f f f 1 f 1 . 
                        . . f f f f f . 
                        . . f . f . f . 
                        `,img`
                        . . . . . . . . 
                        . . . . . . . . 
                        . . . . . . . . 
                        f . . . f . f . 
                        f . . . f f f . 
                        . f f f 1 f 1 . 
                        . . f f f f f . 
                        . . f . f . f . 
                        `,img`
                        . . . . . . . . 
                        . . . . . . . . 
                        . . . . . . . . 
                        f . . . f . f . 
                        f . . . f f f . 
                        . f f f 1 f 1 . 
                        . . f f f f f . 
                        . . f . f . f . 
                        `,img`
                        . . . . . . . . 
                        . . . . . . . . 
                        . . . . . . . . 
                        f . . . f . f . 
                        f . . . f f f . 
                        . f f f 1 f 1 . 
                        . . f f f f f . 
                        . . f . f . f . 
                        `,img`
                        . . . . . . . . 
                        . . . . . . . . 
                        . . . . . . . . 
                        f . . . f . f . 
                        f . . . f f f . 
                        . f f f 1 f 1 . 
                        . . f f f f f . 
                        . . f . f . f . 
                        `,img`
                        . . . . . . . . 
                        . . . . . . . . 
                        . . . . . . . . 
                        f . . . f . f . 
                        f . . . f f f . 
                        . f f f 1 f 1 . 
                        . . f f f f f . 
                        . . f . f . f . 
                        `,img`
                        . . . . . . . . 
                        . . . . . . . . 
                        . . . . . . . . 
                        f . . . f . f . 
                        f . . . f f f . 
                        . f f f 1 f 1 . 
                        . . f f f f f . 
                        . . f . f . f . 
                        `,img`
                        . . . . . . . . 
                        . . . . . . . . 
                        . . . . . . . . 
                        f . . . f . f . 
                        f . . . f f f . 
                        . f f f 1 f 1 . 
                        . . f f f f f . 
                        . . f . f . f . 
                        `,img`
                        . . . . . . . . 
                        . . . . . . . . 
                        . . . . . . . . 
                        f . . . f . f . 
                        f . . . f f f . 
                        . f f f f f f . 
                        . . f f f f f . 
                        . . f . f . f . 
                        `,img`
                        . . . . . . . . 
                        . . . . . . . . 
                        . . . . . . . . 
                        f . . . f . f . 
                        f . . . f f f . 
                        . f f f 1 f 1 . 
                        . . f f f f f . 
                        . . f . f . f . 
                        `,img`
                        . . . . . . . . 
                        . . . . . . . . 
                        . . . . . . . . 
                        f . . . f . f . 
                        f . . . f f f . 
                        . f f f 1 f 1 . 
                        . . f f f f f . 
                        . . f . f . f . 
                        `,img`
                        . . . . . . . . 
                        . . . . . . . . 
                        . . . . . . . . 
                        f . . . f . f . 
                        f . . . f f f . 
                        . f f f 1 f 1 . 
                        . . f f f f f . 
                        . . f . f . f . 
                        `,img`
                        . . . . . . . . 
                        . . . . . . . . 
                        . . . . . . . . 
                        f . . . f . f . 
                        f . . . f f f . 
                        . f f f 1 f 1 . 
                        . . f f f f f . 
                        . . f . f . f . 
                        `,img`
                        . . . . . . . . 
                        . . . . . . . . 
                        . . . . . . . . 
                        f . . . f . f . 
                        f . . . f f f . 
                        . f f f 1 f 1 . 
                        . . f f f f f . 
                        . . f . f . f . 
                        `,img`
                        . . . . . . . . 
                        . . . . . . . . 
                        . . . . . . . . 
                        f . . . f . f . 
                        f . . . f f f . 
                        . f f f 1 f 1 . 
                        . . f f f f f . 
                        . . f . f . f . 
                        `,img`
                        . . . . . . . . 
                        . . . . . . . . 
                        . . . . . . . . 
                        f . . . f . f . 
                        f . . . f f f . 
                        . f f f 1 f 1 . 
                        . . f f f f f . 
                        . . f . f . f . 
                        `,img`
                        . . . . . . . . 
                        . . . . . . . . 
                        . . . . . . . . 
                        f . . . f . f . 
                        f . . . f f f . 
                        . f f f 1 f 1 . 
                        . . f f f f f . 
                        . . f . f . f . 
                        `,img`
                        . . . . . . . . 
                        . . . . . . . . 
                        . . . . . . . . 
                        f . . . f . f . 
                        f . . . f f f . 
                        . f f f 1 f 1 . 
                        . . f f f f f . 
                        . . f . f . f . 
                        `,img`
                        . . . . . . . . 
                        . . . . . . . . 
                        . . . . . . . . 
                        f . . . f . f . 
                        f . . . f f f . 
                        . f f f 1 f 1 . 
                        . . f f f f f . 
                        . . f . f . f . 
                        `,img`
                        . . . . . . . . 
                        . . . . . . . . 
                        . . . . . . . . 
                        f . . . f . f . 
                        f . . . f f f . 
                        . f f f 1 f 1 . 
                        . . f f f f f . 
                        . . f . f . f . 
                        `,img`
                        . . . . . . . . 
                        . . . . . . . . 
                        . . . . . . . . 
                        f . . . f . f . 
                        f . . . f f f . 
                        . f f f 1 f 1 . 
                        . . f f f f f . 
                        . . f . f . f . 
                        `,img`
                        . . . . . . . . 
                        . . . . . . . . 
                        . . . . . . . . 
                        f . . . f . f . 
                        f . . . f f f . 
                        . f f f 1 f 1 . 
                        . . f f f f f . 
                        . . f . f . f . 
                        `,img`
                        . . . . . . . . 
                        . . . . . . . . 
                        . . . . . . . . 
                        f . . . f . f . 
                        f . . . f f f . 
                        . f f f 1 f 1 . 
                        . . f f f f f . 
                        . . f . f . f . 
                        `,img`
                        . . . . . . . . 
                        . . . . . . . . 
                        . . . . . . . . 
                        f . . . f . f . 
                        f . . . f f f . 
                        . f f f f f f . 
                        . . f f f f f . 
                        . . f . f . f . 
                        `,img`
                        . . . . . . . . 
                        . . . . . . . . 
                        . . . . . . . . 
                        . . . . . . . . 
                        f . . . f . f . 
                        f . . . f f f . 
                        . f f f f f f . 
                        . . f f f f f . 
                        `,img`
                        . . . . . . . . 
                        . . . . . . . . 
                        . . . . . . . . 
                        . . . . . . . . 
                        f . . . f . f . 
                        f . . . f f f . 
                        . f f f f f f . 
                        . . f f f f f . 
                        `,img`
                        . 4 4 4 . . . . 
                        . . 4 4 . . . . 
                        . 4 4 . . . . . 
                        . 4 4 4 . . . . 
                        f . . . f . f . 
                        f . . . f f f . 
                        . f f f f f f . 
                        . . f f f f f . 
                        `,img`
                        . 4 4 4 . . . . 
                        . . 4 4 . . . . 
                        . 4 4 . . . . . 
                        . 4 4 4 . . . . 
                        f . . . f . f . 
                        f . . . f f f . 
                        . f f f f f f . 
                        . . f f f f f . 
                        `,img`
                        . 5 5 5 . . . . 
                        . . 5 5 . . . . 
                        . 5 5 . . . . . 
                        . 5 5 5 . . . . 
                        f . . . f . f . 
                        f . . . f f f . 
                        . f f f f f f . 
                        . . f f f f f . 
                        `,img`
                        . 4 4 4 . . . . 
                        . . 4 4 . . . . 
                        . 4 4 . . . . . 
                        . 4 4 4 . . . . 
                        f . . . f . f . 
                        f . . . f f f . 
                        . f f f f f f . 
                        . . f f f f f . 
                        `,img`
                        . 5 5 5 . . . . 
                        . . 5 5 . . . . 
                        . 5 5 . . . . . 
                        . 5 5 5 . . . . 
                        f . . . f . f . 
                        f . . . f f f . 
                        . f f f f f f . 
                        . . f f f f f . 
                        `,img`
                        . 4 4 4 . . . . 
                        . . 4 4 . . . . 
                        . 4 4 . . . . . 
                        . 4 4 4 . . . . 
                        f . . . f . f . 
                        f . . . f f f . 
                        . f f f f f f . 
                        . . f f f f f . 
                        `,img`
                        . 5 5 5 . . . . 
                        . . 5 5 . . . . 
                        . 5 5 . . . . . 
                        . 5 5 5 . . . . 
                        f . . . f . f . 
                        f . . . f f f . 
                        . f f f f f f . 
                        . . f f f f f . 
                        `,img`
                        . 4 4 4 . . . . 
                        . . 4 4 . . . . 
                        . 4 4 . . . . . 
                        . 4 4 4 . . . . 
                        f . . . f . f . 
                        f . . . f f f . 
                        . f f f f f f . 
                        . . f f f f f . 
                        `,img`
                        . 5 5 5 . . . . 
                        . . 5 5 . . . . 
                        . 5 5 . . . . . 
                        . 5 5 5 . . . . 
                        f . . . f . f . 
                        f . . . f f f . 
                        . f f f f f f . 
                        . . f f f f f . 
                        `,img`
                        . 4 4 4 . . . . 
                        . . 4 4 . . . . 
                        . 4 4 . . . . . 
                        . 4 4 4 . . . . 
                        f . . . f . f . 
                        f . . . f f f . 
                        . f f f f f f . 
                        . . f f f f f . 
                        `,img`
                        . 5 5 5 . . . . 
                        . . 5 5 . . . . 
                        . 5 5 . . . . . 
                        . 5 5 5 . . . . 
                        f . . . f . f . 
                        f . . . f f f . 
                        . f f f f f f . 
                        . . f f f f f . 
                        `,img`
                        . . 5 . . . . . 
                        . . . 5 . . . . 
                        . . 5 . . . . . 
                        . 5 . 5 . . . . 
                        f . . . f . f . 
                        f . . . f f f . 
                        . f f f f f f . 
                        . . f f f f f . 
                        `,img`
                        . . . . . . . . 
                        . . . 5 . . . . 
                        . . 5 . . . . . 
                        . . . . . . . . 
                        f . . . f . f . 
                        f . . . f f f . 
                        . f f f f f f . 
                        . . f f f f f . 
                        `,img`
                        . . . . . . . . 
                        . . . . . . . . 
                        . . . . . . . . 
                        . . . . . . . . 
                        f . . . f . f . 
                        f . . . f f f . 
                        . f f f 1 f 1 . 
                        . . f f f f f . 
                        `,img`
                        . . . . . . . . 
                        . . . . . . . . 
                        . . . . . . . . 
                        . . . . . . . . 
                        f . . . f . f . 
                        f . . . f f f . 
                        . f f f 1 f 1 . 
                        . . f f f f f . 
                        `,img`
                        . . . . . . . . 
                        . . . . . . . . 
                        . . . . . . . . 
                        f . . . f . f . 
                        f . . . f f f . 
                        . f f f 1 f 1 . 
                        . . f f f f f . 
                        . . f . f . f . 
                        `],
                    200,
                    characterAnimations.rule(Predicate.NotMoving)
                    )
                    characterAnimations.loopFrames(
                    mySprite,
                    [img`
                        . . . . . . . . 
                        . . . . . . . . 
                        . . . . . . . . 
                        . f . f . . . f 
                        . f f f . . . f 
                        . 1 f 1 f f f . 
                        . f f f f f . . 
                        f . f . . . f . 
                        `],
                    200,
                    characterAnimations.rule(Predicate.MovingUp, Predicate.FacingLeft)
                    )
                    characterAnimations.loopFrames(
                    mySprite,
                    [img`
                        . . . . . . . . 
                        . . . . . . . . 
                        . . . . . . f . 
                        . f . f . . f . 
                        . f f f . . f . 
                        . 1 f 1 f f . . 
                        . f f f f f . . 
                        f . f . f . . . 
                        `],
                    200,
                    characterAnimations.rule(Predicate.MovingDown, Predicate.FacingLeft)
                    )
                    characterAnimations.loopFrames(
                    mySprite,
                    [img`
                        . . . . . . . . 
                        . . . . . . . . 
                        . . . . . . . . 
                        f . . . f . f . 
                        f . . . f f f . 
                        . f f f 1 f 1 . 
                        . . f f f f f . 
                        . f . . . f . f 
                        `],
                    200,
                    characterAnimations.rule(Predicate.MovingUp, Predicate.FacingRight)
                    )
                    characterAnimations.loopFrames(
                    mySprite,
                    [img`
                        . . . . . . . . 
                        . . . . . . . . 
                        . f . . . . . . 
                        . f . . f . f . 
                        . f . . f f f . 
                        . . f f 1 f 1 . 
                        . . f f f f f . 
                        . . . f . f . f 
                        `],
                    200,
                    characterAnimations.rule(Predicate.MovingDown, Predicate.FacingRight)
                    )
                    characterAnimations.loopFrames(
                    mySprite,
                    [img`
                        . . . . . . . . 
                        . . . . . . . . 
                        . . . . . . . . 
                        f . . . f . f . 
                        f . . . f f f . 
                        . f f f 1 f 1 . 
                        . . f f f f f . 
                        . f . . . f . f 
                        `,img`
                        . . . . . . . . 
                        . . . . . . . . 
                        . . . . . . . . 
                        . . . . . . . . 
                        f . . . f . f . 
                        f . . . f f f . 
                        . f f f 1 f 1 . 
                        . . f f f f f . 
                        `],
                    200,
                    characterAnimations.rule(Predicate.MovingRight)
                    )
                    characterAnimations.loopFrames(
                    mySprite,
                    [img`
                        . . . . . . . . 
                        . . . . . . . . 
                        . . . . . . . . 
                        . f . f . . . f 
                        . f f f . . . f 
                        . 1 f 1 f f f . 
                        . f f f f f . . 
                        f . f . . . f . 
                        `,img`
                        . . . . . . . . 
                        . . . . . . . . 
                        . . . . . . . . 
                        . . . . . . . . 
                        . f . f . . . f 
                        . f f f . . . f 
                        . 1 f 1 f f f . 
                        . f f f f f . . 
                        `],
                    200,
                    characterAnimations.rule(Predicate.MovingLeft)
                    )
                    Skin = 0
                }
                sprites.destroy(myMenu)
                controller.moveSprite(mySprite, 70, 0)
                GameStart = 1
                pause(500)
                tiles.setTileAt(location, assets.tile`myTile58`)
            })
        })
    } else {
        mySprite.sayText("A", 50, false)
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile86`, function (sprite, location) {
    if (controller.A.isPressed()) {
        timer.after(1, function () {
            controller.moveSprite(mySprite, 0, 0)
            tiles.setTileAt(location, assets.tile`transparency8`)
            music.stopAllSounds()
            music.play(music.createSong(hex`0078000408020109010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c8000a0000000100050405060708`), music.PlaybackMode.InBackground)
            scene.cameraShake(4, 500)
            color.startFadeFromCurrent(color.White, 1000)
            pause(5000)
            controller.moveSprite(mySprite, 70, 0)
            sprites.destroyAllSpritesOfKind(SpriteKind.Text)
            color.startFadeFromCurrent(color.originalPalette, 1000)
            PlayingLevel = 11
            tiles.setCurrentTilemap(tileUtil.createSmallMap(tilemap`level21`))
            tiles.placeOnTile(mySprite, tiles.getTileLocation(1, 13))
            textSprite2 = textsprite.create("There's always a tomorrow, little kitten.", 1, 15)
            tiles.placeOnTile(textSprite2, tiles.getTileLocation(17, 7))
            profilelife.setFilledLifeImage(img`
                . . . . . . . . 
                . e e . . f f . 
                e 5 5 e f 4 4 f 
                e 5 5 5 4 4 4 f 
                e 5 5 5 4 4 4 f 
                . e 5 5 4 4 f . 
                . . e 5 4 f . . 
                . . . e f . . . 
                `)
            profilelife.setEmptyLifeImage(img`
                . . . . . . . . 
                . e e . . f f . 
                e d d e f e e f 
                e d d d e e e f 
                e d d d e e e f 
                . e d d e e f . 
                . . e d e f . . 
                . . . e f . . . 
                `)
            profilelife.setMaxLife(3)
            info.setLife(3)
            Simulate_Spikes()
            music.play(music.createSong(hex`006e000408080400001c00010a006400f40164000004000000000000000000000000000500000460000000060001190600080001a12000260001192600280001a14000460001194600480001a16000660001196600680001a18000860001198600880001a1a000a6000119a600a80001a1c000c6000119c600c80001a1e000e6000119e600e80001a105001c000f0a006400f4010a00000400000000000000000000000000000000020e0100000400010d06000a00010d0c001000010d12001600010d18001c00010d1e002200010d24002800010d2a002e00010d30003400010d36003a00010d3c003e00010d40004400010d46004a00010d4c005000010d52005600010d58005c00010d5e006200010d64006800010d6a006e00010d70007400010d76007a00010d7c007e00010d80008400018e86008a00018e8c009000018e92009600018e98009c00018e9e00a000018ea000a4000190a600aa000190ac00b0000190b200b6000190b800bc000190bc00c000018ec000c400010dc600ca00010dcc00d000010dd200d600010dd800dc00010dde00e200010de400e800010dea00ee00010df000f400010df600fa00010dfc00fe00010d07001c00020a006400f401640000040000000000000000000000000000000003900008000a00011910001200011918001a00019a28002a00011930003200011938003a00019c48004a00011950005200011958005a00019a68006a00011970007200011978007a00019c88008a00019a90009200019a98009a00019aa800aa00019cb000b200019cb800ba00019ec800ca000119d000d2000119d800da00019ae800ea000119f000f2000119f800fa00019c09010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c80029010000010001040200030001041000110001041600170001041c001d0001042000210001042400250001042a002b0001042c002d0001042e002f0001043000310001043e003f0001044000410001044200430001045000510001045200530001045800590001045e005f000104680069000104700071000104760077000104780079000104800081000104880089000204068e008f0001049000910001049800990001069c009d00020406a000a1000104a800a900020406b000b1000104bc00bd00020406c000c100020406c800c900020406ca00cb000104d600d7000104d800d9000106da00db000104dc00dd000106de00df000104e600e7000104e800e900020406ea00eb000104f200f3000104f400f5000104f600f7000104f800f900020406fc00fd00020406`), music.PlaybackMode.LoopingInBackground)
        })
    } else {
        mySprite.sayText("A", 50, false)
    }
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (GameStart == 1) {
        if (Phase == 1) {
            if (mySprite.vx == 0) {
                Phase = 2
                Phased()
                music.play(music.createSoundEffect(
                WaveShape.Sawtooth,
                382,
                382,
                600,
                0,
                300,
                SoundExpressionEffect.Warble,
                InterpolationCurve.Linear
                ), music.PlaybackMode.InBackground)
            }
        } else {
            if (Phase == 2) {
                if (mySprite.vx == 0) {
                    Phase = 1
                    PhasedBack()
                    music.play(music.createSoundEffect(
                    WaveShape.Sawtooth,
                    382,
                    382,
                    0,
                    600,
                    300,
                    SoundExpressionEffect.Warble,
                    InterpolationCurve.Linear
                    ), music.PlaybackMode.InBackground)
                }
            }
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile34`, function (sprite, location) {
    if (LevelsDone >= 6) {
        if (controller.A.isPressed()) {
            timer.after(1, function () {
                controller.moveSprite(mySprite, 0, 0)
                tiles.setTileAt(location, assets.tile`transparency8`)
                music.stopAllSounds()
                music.play(music.createSong(hex`0078000408020109010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c8000a0000000100050405060708`), music.PlaybackMode.InBackground)
                scene.cameraShake(4, 500)
                color.startFadeFromCurrent(color.White, 1000)
                pause(5000)
                sprites.destroyAllSpritesOfKind(SpriteKind.Text)
                color.startFadeFromCurrent(color.originalPalette, 200)
                tiles.setCurrentTilemap(tileUtil.createSmallMap(tilemap`level20`))
                tiles.placeOnTile(mySprite, tiles.getTileLocation(146, 7))
                Simulate_Spikes()
                music.play(music.createSong(hex`0064000408080400001c00010a006400f401640000040000000000000000000000000005000004800100000200011802000400011b04000600019f06000800012408000a0001250a000c0001240c000e00019f0e001000011b10001200011812001400011b14001600019f16001800012418001a0001251a001c0001241c001e00019f1e002000011b40004200011842004400011b44004600019f46004800012448004a0001254a004c0001244c004e00019f4e005000011b50005200011852005400011b54005600019f56005800012458005a0001255a005c0001245c005e00019f5e006000011b80008200011882008400011b84008600019f86008800012488008a0001258a008c0001248c008e00019f8e009000011b90009200011892009400011b94009600019f96009800012498009a0001259a009c0001249c009e00019f9e00a000011bc000c2000118c200c400011bc400c600019fc600c8000124c800ca000125ca00cc000124cc00ce00019fce00d000011bd000d2000118d200d400011bd400d600019fd600d8000124d800da000125da00dc000124dc00de00019fde00e000011b05001c000f0a006400f4010a0000040000000000000000000000000000000002d20000000800010c08001000011810001800010c18001e0001181e002000011928003000010c30003800011838003e0001193e004000011640004800010c48005000011850005800010c58005e0001185e006000011968007000010c70007800011878007e0001197e008000011680008800018d88009000019990009800018d98009e0001999e00a0000119a000a800010fa800b000011bb000bc00010fbc00c000010dc000c800010cc800d0000118d000d800010cd800e0000118e000e800010ce800f0000118f000f800010cf8000001011808001c000e050046006603320000040a002d0000006400140001320002010002f00008000a0001241200140001241400160001242400260001242a002c0001243000320001243c003e00012440004200012446004800012448004a0001244a004c00012454005600012458005a0001245e006000012472007400012474007600012476007800012478007a0001247e008000012488008a0001258c008e00012598009a0001259e00a0000125a800aa000127aa00ac000127b000b2000127bc00be000125c000c2000124cc00ce000124d000d2000124d400d6000124d800da000124de00e0000124e000e2000124ea00ec000124ec00ee000124ee00f0000124f000f2000124f800fa000124fe000001012409010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c800cc010000010001030800090001030a000b0001060c000d0001061000110001031200130001061800190001031a001b0001061e001f000106200021000214032200230001062400250001062600270001062800290001033000310001033200330001063600370001063800390001033c003d0001063e003f0001064000410001034800490001034a004b0001065000510001035200530001065400550001065800590001035a005b0001065c005d0001065e005f000106600061000214036200630001066600670001066800690001036e006f0001067000710001037400750001067800790001037a007b0001067c007d0001067e007f0001068000810001038400850001068800890001038a008b0001068c008d000106900091000103920093000106960097000106980099000103a000a100021403a800a9000103aa00ab000106ac00ad000106b000b1000103bc00bd000103c000c1000103c800c9000103ca00cb000106cc00cd000106ce00cf000106d000d1000103d200d3000106d400d5000106d600d7000106d800d9000103e000e100021403e200e3000106e800e9000103ea00eb000106ee00ef000106f000f1000103f200f3000106f400f5000106f800f9000103fe00ff000106`), music.PlaybackMode.LoopingInBackground)
                controller.moveSprite(mySprite, 0, 0)
                mySprite3 = sprites.create(img`
                    . . . . . . . . 
                    . . . . . . . . 
                    . . . . . . . . 
                    4 . . . 4 . 4 . 
                    4 . . . 4 4 4 . 
                    . 4 4 4 5 4 5 . 
                    . . 4 4 4 4 4 . 
                    . . 4 . 4 . 4 . 
                    `, SpriteKind.Boss2)
                mySprite3.ay = 180
                tiles.placeOnTile(mySprite3, tiles.getTileLocation(146, 11))
                profilelife.setFilledLifeImage(img`
                    . . . . . . . . 
                    . e e . . f f . 
                    e 5 5 e f 4 4 f 
                    e 5 5 5 4 4 4 f 
                    e 5 5 5 4 4 4 f 
                    . e 5 5 4 4 f . 
                    . . e 5 4 f . . 
                    . . . e f . . . 
                    `)
                profilelife.setEmptyLifeImage(img`
                    . . . . . . . . 
                    . e e . . f f . 
                    e d d e f e e f 
                    e d d d e e e f 
                    e d d d e e e f 
                    . e d d e e f . 
                    . . e d e f . . 
                    . . . e f . . . 
                    `)
                profilelife.setMaxLife(3)
                info.setLife(3)
                PlayingLevel = 10
                scene.cameraShake(4, 1000)
                mySprite4 = sprites.create(img`
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................ff..............................
                    ...............................................................................................................................ff...............................
                    .............................................................................................................................ffff...............................
                    ...........................................................................................................................fffff................................
                    ..........................................................................................................................fffff.................................
                    ........................................................................................................................fffffff.................................
                    ......................................................................................................................ffffffff..................................
                    ....................................................................................................................ffffffffff..................................
                    .................................................................................................................ffffffffffff...................................
                    ..............................................................................................................fffffffffffffff...................................
                    ............................................................................................................ffffffffffffffff....................................
                    .........................................................................................................fffffffffffffffffff....................................
                    .....................................................................................................ffffffffffffffffffffff.....................................
                    .................................................................................................ffffffffffffffffffffffffff.....................................
                    .............................................................................................fffffffffffffffffffffffffffff......................................
                    ...............ffff......................................................................fffffffffffffffffffffffffffffffff......................................
                    ................fffffff...............................................................fffffffffffffffffffffffffffffffffff.......................................
                    ..................fffffffff......................................................ffffffffffffffffffffffffffffffffffffffff.......................................
                    ...................ffffffffffff............................................fffffffffffffffffffffffffffffffffffffffffffff........................................
                    ....................ffffffffffffff.....................................fffffffffffffffffffffffffffffffffffffffffffffffff........................................
                    .....................ffffffffffffffffffffffffff..................fffffffffffffffffffffffffffffffffffffffffffffffffffffff........................................
                    .......................ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff.........................................
                    ........................fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff.........................................
                    .........................ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff11ffffff.........................................
                    ..........................fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111ffff..........................................
                    ...........................ffffffffffffffff1111111f1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1111ffff..........................................
                    ............................ffffffffffffff11111111111111ffffffffffffffffffffffffffffffffffffffffffffffffffffff1111ffff..........................................
                    .............................fffffffffffffff111111111111111fffffffffffffffffffffffffffffffffffffffffffffffffff1111fff...........................................
                    ..............................ffffffffffffffffffff11ff11111fffffffffffffffffffffffffffffffffffffffffffffffffff111ffff...........................................
                    ................................ffffffffffffffffff11ffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111ffff...........................................
                    ................................ffffffffffffffffff11ffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111fff............................................
                    ..................................ffffffffffffffff11ffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111fff............................................
                    ..................................ffffffffffffffff11ffffffffffffffffffffffffffffffffffffffffffffffffffffffffff11ffff............................................
                    .....................................fffffffffffff11ffffffffffffffffffffffffffffffffffffffffffffffffffffffffff11ffff............................................
                    ......................................ffffffffffff11fffffffffffffffffffff11ffffff111fffffffffffffffffffffffff111ffff............................................
                    .......................................fffffffffff11fffffffffff11fffffffff1111fff1fffff1fff1ff1fff1ffffffffff11fffff............................................
                    .......................................fffffffffff11ffffff11ffff1ff1111ffff1fffff1fffff11ff1ff1fff1ff1111ffff11fffff............................................
                    .......................................fffffffffff11fffffff11fff1ff1ff11fff1fffff1fffff111f1ff1fff1ff1ff1fffffffffff............................................
                    .......................................fffffffffff11fffffff111ff11f1fff1fff1fffff1ff11f1f1f1ff1fff1ff11fffffffffffff............................................
                    ........................................ffffffffff11ffffffff111ff1f11ff1fff1ffff11fff1f1f1f1ff1fff1fff1ffffffffffffff...........................................
                    ........................................fffff111ff11ffffffff1f11f1ff1f11fff1ffff1ffff1f1f111ff11f11fff11ffff1ffffffff...........................................
                    ........................................fffff1111111ffffffff1ff111ff1f1ffff1ffff11ff11f1ff11fff111ff1ff1ffff11fffffff...........................................
                    .........................................ffff1111111111fffff11ff11ff111ff11111fff1111ff1ffffffffffff11f1fff11ffffffff...........................................
                    .........................................fffffff111111111ffff1fff1ff11fffffffffffffffffffffffffffffff111fff1fffffffff...........................................
                    .........................................ffffffffffff111111ff1fffffffffffffffffffffffffffffffffffffffffffffffffffffff...........................................
                    .........................................ffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffff...........................................
                    .........................................fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff..........................................
                    .........................................fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff..........................................
                    .........................................fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff..........................................
                    .........................................fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff..........................................
                    ........................................ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff..........................................
                    ........................................ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff..........................................
                    ........................................fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff.........................................
                    ........................................fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff.........................................
                    ........................................ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff........................................
                    ........................................ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff........................................
                    .......................................ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff.......................................
                    .......................................ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff.......................................
                    .......................................fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......................................
                    ......................................fffffffffffffffffffffff............fffffffffffffffffffffffffffffffffffffffffffffffff......................................
                    ......................................ffffffffffffffffff......................................fffffffffffffffffffffffffffff.....................................
                    .....................................fffffffffffffff...............................................fffffffffffffffffffffffff....................................
                    .....................................fffffffffff...d.d.d.d.ddd.d.d...ddd.ddd.ddd...44.4.444.444.............ffffffffffffffff....................................
                    .....................................ffffffff......d.d.d.d.d.d.d.d...d.d.d.d.d.....44.4.4.4..4..................fffffffffffff...................................
                    .....................................ffffff............ddd.d.d.d.d...ddd.ddd.dd....4.44.4.4..4.......................ffffffff...................................
                    ....................................fffff...............d..d.d.d.d...d.d.dd..d.....4.44.4.4..4...........................fffff..................................
                    ....................................fff.................d..ddd.ddd...d.d.d.d.ddd...4.44.444..4...............................f..................................
                    ................................................................................................................................................................
                    .............................................................ddd.d.d.ddd...ddd.dd.d.ddd.d.d.....................................................................
                    ..............................................................d..d.d.d.....d.d.dd.d.d...d.d.....................................................................
                    ..............................................................d..ddd.dd....d.d.d.dd.dd..........................................................................
                    ..............................................................d..d.d.d.....d.d.d.dd.d...........................................................................
                    ..............................................................d..d.d.ddd...ddd.d.dd.ddd.........................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    `, SpriteKind.Text)
                mySprite4.x = scene.cameraProperty(CameraProperty.X)
                mySprite4.y = scene.cameraProperty(CameraProperty.Y)
                pause(3000)
                controller.moveSprite(mySprite, 70, 0)
                controller.moveSprite(mySprite3, 70, 0)
                scene.cameraShake(4, 1000)
                sprites.destroy(mySprite4)
                mySprite3.setImage(img`
                    . . . . . . . . 
                    . . . . . . . . 
                    . . . . . . . . 
                    4 . . . 4 . 4 . 
                    4 . . . 4 4 4 . 
                    . 4 4 4 5 4 5 . 
                    . . 4 4 4 4 4 . 
                    . . 4 . 4 . 4 . 
                    `)
                characterAnimations.loopFrames(
                mySprite3,
                [img`
                    . . . . . . . . 
                    . . . . . . . . 
                    . . . . . . . . 
                    4 . . . 4 . 4 . 
                    4 . . . 4 4 4 . 
                    . 4 4 4 5 4 5 . 
                    . . 4 4 4 4 4 . 
                    . . 4 . 4 . 4 . 
                    `],
                200,
                characterAnimations.rule(Predicate.NotMoving)
                )
                characterAnimations.loopFrames(
                mySprite3,
                [img`
                    . . . . . . . . 
                    . . . . . . . . 
                    . . . . . . . . 
                    . 4 . 4 . . . 4 
                    . 4 4 4 . . . 4 
                    . 5 4 5 4 4 4 . 
                    . 4 4 4 4 4 . . 
                    4 . 4 . . . 4 . 
                    `],
                200,
                characterAnimations.rule(Predicate.MovingUp, Predicate.FacingLeft)
                )
                characterAnimations.loopFrames(
                mySprite3,
                [img`
                    . . . . . . . . 
                    . . . . . . . . 
                    . . . . . . 4 . 
                    . 4 . 4 . . 4 . 
                    . 4 4 4 . . 4 . 
                    . 5 4 5 4 4 . . 
                    . 4 4 4 4 4 . . 
                    4 . 4 . 4 . . . 
                    `],
                200,
                characterAnimations.rule(Predicate.MovingDown, Predicate.FacingLeft)
                )
                characterAnimations.loopFrames(
                mySprite3,
                [img`
                    . . . . . . . . 
                    . . . . . . . . 
                    . . . . . . . . 
                    4 . . . 4 . 4 . 
                    4 . . . 4 4 4 . 
                    . 4 4 4 5 4 5 . 
                    . . 4 4 4 4 4 . 
                    . 4 . . . 4 . 4 
                    `],
                200,
                characterAnimations.rule(Predicate.MovingUp, Predicate.FacingRight)
                )
                characterAnimations.loopFrames(
                mySprite3,
                [img`
                    . . . . . . . . 
                    . . . . . . . . 
                    . 4 . . . . . . 
                    . 4 . . 4 . 4 . 
                    . 4 . . 4 4 4 . 
                    . . 4 4 5 4 5 . 
                    . . 4 4 4 4 4 . 
                    . . . 4 . 4 . 4 
                    `],
                200,
                characterAnimations.rule(Predicate.MovingDown, Predicate.FacingRight)
                )
                characterAnimations.loopFrames(
                mySprite3,
                [img`
                    . . . . . . . . 
                    . . . . . . . . 
                    . . . . . . . . 
                    4 . . . 4 . 4 . 
                    4 . . . 4 4 4 . 
                    . 4 4 4 5 4 5 . 
                    . . 4 4 4 4 4 . 
                    . 4 . . . 4 . 4 
                    `,img`
                    . . . . . . . . 
                    . . . . . . . . 
                    . . . . . . . . 
                    . . . . . . . . 
                    4 . . . 4 . 4 . 
                    4 . . . 4 4 4 . 
                    . 4 4 4 5 4 5 . 
                    . . 4 4 4 4 4 . 
                    `],
                200,
                characterAnimations.rule(Predicate.MovingRight)
                )
                characterAnimations.loopFrames(
                mySprite3,
                [img`
                    . . . . . . . . 
                    . . . . . . . . 
                    . . . . . . . . 
                    . 4 . 4 . . . 4 
                    . 4 4 4 . . . 4 
                    . 5 4 5 4 4 4 . 
                    . 4 4 4 4 4 . . 
                    4 . 4 . . . 4 . 
                    `,img`
                    . . . . . . . . 
                    . . . . . . . . 
                    . . . . . . . . 
                    . . . . . . . . 
                    . 4 . 4 . . . 4 
                    . 4 4 4 . . . 4 
                    . 5 4 5 4 4 4 . 
                    . 4 4 4 4 4 . . 
                    `],
                200,
                characterAnimations.rule(Predicate.MovingLeft)
                )
            })
        } else {
            mySprite.sayText("A", 50, false)
        }
    } else {
        mySprite.sayText("Complete 6 Levels to Face.", 100, false)
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile32`, function (sprite, location) {
    if (controller.A.isPressed()) {
        timer.after(1, function () {
            controller.moveSprite(mySprite, 0, 0)
            tiles.setTileAt(location, assets.tile`transparency8`)
            music.stopAllSounds()
            music.play(music.createSong(hex`0078000408020109010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c8000a0000000100050405060708`), music.PlaybackMode.InBackground)
            scene.cameraShake(4, 500)
            color.startFadeFromCurrent(color.White, 1000)
            pause(5000)
            controller.moveSprite(mySprite, 70, 0)
            sprites.destroyAllSpritesOfKind(SpriteKind.Text)
            color.startFadeFromCurrent(color.originalPalette, 1000)
            PlayingLevel = 8
            tiles.setCurrentTilemap(tileUtil.createSmallMap(tilemap`level18`))
            tiles.placeOnTile(mySprite, tiles.getTileLocation(1, 13))
            textSprite2 = textsprite.create("And you're just a filthy piece of greedy scum.", 1, 6)
            tiles.placeOnTile(textSprite2, tiles.getTileLocation(19, 7))
            profilelife.setFilledLifeImage(img`
                . . . . . . . . 
                . e e . . f f . 
                e 7 7 e f 6 6 f 
                e 7 7 7 6 6 6 f 
                e 7 7 7 6 6 6 f 
                . e 7 7 6 6 f . 
                . . e 7 6 f . . 
                . . . e f . . . 
                `)
            profilelife.setEmptyLifeImage(img`
                . . . . . . . . 
                . e e . . f f . 
                e d d e f e e f 
                e d d d e e e f 
                e d d d e e e f 
                . e d d e e f . 
                . . e d e f . . 
                . . . e f . . . 
                `)
            profilelife.setMaxLife(3)
            info.setLife(3)
            Simulate_Spikes()
            music.play(music.createSong(hex`0064000408040405001c000f0a006400f4010a00000400000000000000000000000000000000026c000000020001240600080001240c000e00012412001400012418001a0001241e00200001242000220001243000380001273800400001a64000420001244600480001244c004e00012452005400012458005a0001245e006000012460006200012470007800012978008000012707001c00020a006400f401640000040000000000000000000000000000000003840000000400011804000800011b08000c00019f18001c0001181c002000011b20002400019f26002a00019f2c003000019f32003600019f38003c00011d3c004000019f40004400011844004800011b48004c00019f58005c0001185c006000011b60006400019f66006a00019f6c007000019f72007600019f78007c00011d7c008000019f08001c000e050046006603320000040a002d0000006400140001320002010002180000001000010c20003000010c40005000010c60007000010c09010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c8006000000001000103080009000103100011000103180019000103200021000103280029000103300031000103380039000103400041000103480049000103500051000103580059000103600061000103680069000103700071000103780079000103`), music.PlaybackMode.LoopingInBackground)
        })
    } else {
        mySprite.sayText("A", 50, false)
    }
})
controller.down.onEvent(ControllerButtonEvent.Released, function () {
    if (GameStart == 0) {
        if (Orb == 1.5) {
            if (CycleLevel < 8) {
                Orb = 1
                GameStart = 1
                controller.moveSprite(mySprite, 70, 0)
                CycleLevel = 0
                music.play(music.createSoundEffect(
                WaveShape.Noise,
                2089,
                1,
                600,
                0,
                300,
                SoundExpressionEffect.Vibrato,
                InterpolationCurve.Logarithmic
                ), music.PlaybackMode.InBackground)
                mySprite5.setImage(img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . d d d d d d . . . . . 
                    . . . . d d d d d d d d . . . . 
                    . . . d d d d d d d d d d . . . 
                    . . d d d d d d d d d d d d . . 
                    . . d d d d d d d d d d d d . . 
                    . . d d d d d f f d d d d d . . 
                    . . d d d d d f f d d d d d . . 
                    . . d d d d d d d d d d d d . . 
                    . . d d d d d d d d d d d d . . 
                    . . e d d d d d d d d d d e . . 
                    . . . e d d d d d d d d e . . . 
                    . . . . e d d d d d d e . . . . 
                    . . . . . e e e e e e . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `)
                animation.stopAnimation(animation.AnimationTypes.All, mySprite)
                characterAnimations.setCharacterAnimationsEnabled(mySprite, true)
            } else {
                if (CycleLevel >= 8) {
                    extraEffects.createSpreadEffectOnAnchor(mySprite, extraEffects.createSingleColorSpreadEffectData(14, ExtraEffectPresetShape.Spark), 1800, 33, 60)
                    Orb = 2
                    GameStart = 0
                    controller.moveSprite(mySprite, 100, 100)
                    mySprite.ay = 0
                    CycleLevel = 8
                    music.play(music.createSoundEffect(
                    WaveShape.Noise,
                    1873,
                    1,
                    600,
                    0,
                    1200,
                    SoundExpressionEffect.Tremolo,
                    InterpolationCurve.Logarithmic
                    ), music.PlaybackMode.InBackground)
                    mySprite5.setImage(img`
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . 3 3 3 3 3 3 . . . . . 
                        . . . . 3 3 3 3 3 3 3 3 . . . . 
                        . . . 3 3 3 3 3 3 3 3 3 3 . . . 
                        . . 3 3 3 3 3 3 3 3 3 3 3 3 . . 
                        . . 3 3 3 3 3 3 3 3 3 3 3 3 . . 
                        . . 3 3 3 3 3 f f 3 3 3 3 3 . . 
                        . . 3 3 3 3 3 f f 3 3 3 3 3 . . 
                        . . 3 3 3 3 3 3 3 3 3 3 3 3 . . 
                        . . 3 3 3 3 3 3 3 3 3 3 3 3 . . 
                        . . 2 3 3 3 3 3 3 3 3 3 3 2 . . 
                        . . . 2 3 3 3 3 3 3 3 3 2 . . . 
                        . . . . 2 3 3 3 3 3 3 2 . . . . 
                        . . . . . 2 2 2 2 2 2 . . . . . 
                        . . . . . . . . . . . . . . . . 
                        `)
                    mySprite.setImage(img`
                        . . . . . . . . 
                        . . . . . . . . 
                        . . . f f . . . 
                        . . f f f f . . 
                        . f f 1 f 1 f . 
                        . f f f f f f . 
                        . . f f f f . . 
                        . . . f f . . . 
                        `)
                    animation.stopAnimation(animation.AnimationTypes.All, mySprite)
                    SubCycle()
                } else {
                	
                }
            }
        }
    }
})
scene.onOverlapTile(SpriteKind.Boss, assets.tile`myTile53`, function (sprite, location) {
    sprite.setKind(SpriteKind.Nothing)
    info.setLife(0)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile33`, function (sprite, location) {
    if (controller.A.isPressed()) {
        timer.after(1, function () {
            controller.moveSprite(mySprite, 0, 0)
            tiles.setTileAt(location, assets.tile`transparency8`)
            music.stopAllSounds()
            music.play(music.createSong(hex`0078000408020109010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c8000a0000000100050405060708`), music.PlaybackMode.InBackground)
            scene.cameraShake(4, 500)
            color.startFadeFromCurrent(color.White, 1000)
            pause(5000)
            controller.moveSprite(mySprite, 70, 0)
            sprites.destroyAllSpritesOfKind(SpriteKind.Text)
            color.startFadeFromCurrent(color.originalPalette, 1000)
            PlayingLevel = 9
            tiles.setCurrentTilemap(tileUtil.createSmallMap(tilemap`level19`))
            tiles.placeOnTile(mySprite, tiles.getTileLocation(1, 13))
            textSprite2 = textsprite.create("Face me, and prove to each their own.", 1, 15)
            tiles.placeOnTile(textSprite2, tiles.getTileLocation(19, 7))
            profilelife.setFilledLifeImage(img`
                . . . . . . . . 
                . e e . . f f . 
                e 5 5 e f 4 4 f 
                e 5 5 5 4 4 4 f 
                e 5 5 5 4 4 4 f 
                . e 5 5 4 4 f . 
                . . e 5 4 f . . 
                . . . e f . . . 
                `)
            profilelife.setEmptyLifeImage(img`
                . . . . . . . . 
                . e e . . f f . 
                e d d e f e e f 
                e d d d e e e f 
                e d d d e e e f 
                . e d d e e f . 
                . . e d e f . . 
                . . . e f . . . 
                `)
            profilelife.setMaxLife(3)
            info.setLife(3)
            Simulate_Spikes()
            music.play(music.createSong(hex`005a000408080400001c00010a006400f401640000040000000000000000000000000005000004000300000200011802000400019a04000600011b06000800019f08000a0001240a000c0001180c000e00019a0e001000011b10001200019f12001400012414001600011816001800019a18001a00011b1a001c00019f1c001e0001241e002000011b20002200011d22002400019f24002600012226002800012728002a00011b2a002c00011d2c002e00019f2e003000012230003200012732003400019a34003600011b36003800019f38003a0001243a003c00019f3c003e00011b3e004000019740004200011842004400019a44004600011b46004800019f48004a0001244a004c0001184c004e00019a4e005000011b50005200019f52005400012454005600011856005800019a58005a00011b5a005c00019f5c005e0001245e006000011b60006200011d62006400019f64006600012266006800012768006a00011b6a006c00011d6c006e00019f6e007000012270007200012772007400019a74007600011b76007800019f78007a0001247a007c00019f7c007e00011b7e008000019780008200011882008400019a84008600011b86008800019f88008a0001248a008c0001188c008e00019a8e009000011b90009200019f92009400012494009600011896009800019a98009a00011b9a009c00019f9c009e0001249e00a000011ba000a200011da200a400019fa400a6000122a600a8000127a800aa00011baa00ac00011dac00ae00019fae00b0000122b000b2000127b200b400019ab400b600011bb600b800019fb800ba000124ba00bc00019fbc00be00011bbe00c0000197c000c2000118c200c400019ac400c600011bc600c800019fc800ca000124ca00cc000118cc00ce00019ace00d000011bd000d200019fd200d4000124d400d6000118d600d800019ad800da00011bda00dc00019fdc00de000124de00e000011be000e200011de200e400019fe400e6000122e600e8000127e800ea00011bea00ec00011dec00ee00019fee00f0000122f000f2000127f200f400019af400f600011bf600f800019ff800fa000124fa00fc00019ffc00fe00011bfe000001019703001c0001dc00690000045e01000400000000000000000000056400010400031e008000a0000118a000c000011bc000e0000118e000f000011df0000001019f07001c00020a006400f401640000040000000000000000000000000000000003a20000000400011806000800011820002400011b26002800011b40004400011846004800011860006400011b66006800011b70007400011d76007800011d78007c00019f800084000118860088000118a000a400011ba600a800011bb000b4000118b600b8000118b800bc000197be00c0000197c000c4000118c600c8000118e000e400011be600e800011bf000f400011df600f800011df800fc00019ffe00000101a309010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c80011010000010001030e000f0001031000110001031400150001032800290001032a002b0001033800390001033e003f0001034000410001034e004f0001035000510001035400550001036600670001036800690001036a006b0001036c006d0001037200730001037800790001037e007f0001038000810001038800890001068e008f000103900091000103940095000103980099000106a800a900020306aa00ab000103b800b900020306be00bf000103c000c1000103c600c7000103c800c900020306cc00cd000103d800d900020306e000e100020306e600e7000103e800e900020306ee00ef000103f000f1000106f400f500020306f800f9000106fa00fb00020306fc00fd000106fe00ff00020306`), music.PlaybackMode.LoopingInBackground)
        })
    } else {
        mySprite.sayText("A", 50, false)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Shot, function (sprite, otherSprite) {
    scene.cameraShake(4, 500)
    characterAnimations.setCharacterAnimationsEnabled(mySprite, false)
    animation.runImageAnimation(
    mySprite,
    [img`
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        f . . . f . f . 
        f . . . f f f . 
        . f f f 1 f 1 . 
        . . f f f f f . 
        . f . . . f . f 
        `,img`
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        5 . . . 5 . 5 . 
        5 . . . 5 5 5 . 
        . 5 5 5 4 5 4 . 
        . . 5 5 5 5 5 . 
        . 5 . . . 5 . 5 
        `],
    50,
    true
    )
    music.play(music.createSoundEffect(
    WaveShape.Noise,
    2471,
    2313,
    600,
    0,
    200,
    SoundExpressionEffect.Vibrato,
    InterpolationCurve.Logarithmic
    ), music.PlaybackMode.InBackground)
    info.changeLifeBy(-1)
    mySprite.setFlag(SpriteFlag.GhostThroughSprites, true)
    sprites.destroy(otherSprite)
    timer.after(500, function () {
        animation.stopAnimation(animation.AnimationTypes.All, mySprite)
        mySprite.setFlag(SpriteFlag.GhostThroughSprites, false)
        characterAnimations.setCharacterAnimationsEnabled(mySprite, true)
    })
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile42`, function (sprite, location) {
    if (info.life() < 3) {
        tiles.setTileAt(location, assets.tile`myTile43`)
        extraEffects.createSpreadEffectOnAnchor(mySprite, extraEffects.createSingleColorSpreadEffectData(5, ExtraEffectPresetShape.Spark), 100)
        info.changeLifeBy(1)
        music.play(music.createSoundEffect(
        WaveShape.Triangle,
        1,
        1726,
        400,
        250,
        500,
        SoundExpressionEffect.Warble,
        InterpolationCurve.Curve
        ), music.PlaybackMode.InBackground)
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile29`, function (sprite, location) {
    if (LevelsDone >= 3) {
        if (controller.A.isPressed()) {
            timer.after(1, function () {
                controller.moveSprite(mySprite, 0, 0)
                tiles.setTileAt(location, assets.tile`transparency8`)
                music.stopAllSounds()
                music.play(music.createSong(hex`0078000408020109010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c8000a0000000100050405060708`), music.PlaybackMode.InBackground)
                scene.cameraShake(4, 500)
                color.startFadeFromCurrent(color.White, 1000)
                pause(5000)
                sprites.destroyAllSpritesOfKind(SpriteKind.Text)
                color.startFadeFromCurrent(color.originalPalette, 200)
                tiles.setCurrentTilemap(tileUtil.createSmallMap(tilemap`level12`))
                tiles.placeOnTile(mySprite, tiles.getTileLocation(146, 7))
                Simulate_Spikes()
                music.play(music.createSong(hex`0064000408080400001c00010a006400f401640000040000000000000000000000000005000004f0008000820001258400860001198a008c0001258e009000011992009400012596009800011998009a0001a69a009c0001a69c009e0001a69e00a00001a6a000a2000125a400a6000119aa00ac000125ae00b0000119b200b4000125b600b8000119b800ba0001a6ba00bc0001a6bc00be0001a6be00c00001a8c000c2000125c400c6000119ca00cc000125ce00d0000119d200d4000125d600d8000119d800da0001a6da00dc0001a6dc00de0001a6de00e00001a6e000e2000125e400e6000119ea00ec000125ee00f0000119f200f4000125f600f8000119f800fa0001a6fa00fc0001a6fc00fe0001a6fe00000101a805001c000f0a006400f4010a0000040000000000000000000000000000000002f8010200040001190400060001190600080001190a000c0001190c000e0001190e00100001191200140001191400160001191600180001191a001c0001191c001e0001191e00200001192200240001192400260001192600280001192a002c0001192c002e0001192e00300001193200340001193400360001193600380001194200440001194400460001194600480001194a004c0001194c004e0001194e00500001195200540001195400560001195600580001195a005c0001195c005e0001195e00600001196200640001196400660001196600680001196a006c0001196c006e0001196e00700001197200740001197400760001197600780001198200840001198400860001198600880001198a008c0001198c008e0001198e00900001199200940001199400960001199600980001199a009c0001199c009e0001199e00a0000119a200a4000119a400a6000119a600a8000119aa00ac000119ac00ae000119ae00b0000119b200b4000119b400b6000119b600b8000119c200c4000119c400c6000119c600c8000119ca00cc000119cc00ce000119ce00d0000119d200d4000119d400d6000119d600d8000119da00dc000119dc00de000119de00e0000119e200e4000119e400e6000119e600e8000119ea00ec000119ec00ee000119ee00f0000119f200f4000119f400f6000119f600f800011908001c000e050046006603320000040a002d00000064001400013200020100023c0000001000010d38004000018e40005000010d70007800018e78008000019080009000010db800c000018ec000d000010df000f800018ef8000001019009010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c80020010000010001030800090001031000110001031800190001032000210001032800290001033000310001033200330001053400350001053600370001033800390001083c003d0001084000410001034800490001035000510001035800590001036000610001036800690001037000710001037200730001057400750001057600770001037800790001087c007d000108800081000103880089000103900091000103980099000103a000a1000103a800a9000103b000b1000103b200b3000105b400b5000105b600b7000103b800b9000108bc00bd000108c000c1000103c800c9000103d000d1000103d800d9000103e000e1000103e800e9000103f000f1000103f200f3000105f400f5000105f600f7000103f800f9000108fc00fd000108`), music.PlaybackMode.LoopingInBackground)
                controller.moveSprite(mySprite, 0, 0)
                mySprite3 = sprites.create(img`
                    ..ddddddddddddddddd..
                    .ddddddddddddddddddd.
                    ddddcccdddddddcccdddd
                    dddcfffccdddccfffcddd
                    dddfeeeffcdcffeeefddd
                    dddeeeeeefcfeeeeeeddd
                    dddefffeefcfeefffeddd
                    dddfcccfedcdefcccfddd
                    dddefffedfcfdefffeddd
                    edddeeeddfdfddeeeddde
                    ddddddddfdcdfdddddddd
                    edddccfdffdffdfccddde
                    edfcccffefffeffcccfde
                    edfccceeeeeeeeecccfde
                    edfccddeeeeeeeddccfde
                    edefddddfffffddddfede
                    edeeefdfeeeeefdfeeede
                    eedeefdddeeedddfeedee
                    .eedddfdddddddfdddee.
                    ..eeeeeeeeeeeeeeeee..
                    `, SpriteKind.Boss)
                mySprite3.setScale(2, ScaleAnchor.Middle)
                tiles.placeOnTile(mySprite3, tiles.getTileLocation(146, 11))
                profilelife.setFilledLifeImage(img`
                    . . . . . . . . 
                    . e e . . f f . 
                    e 5 5 e f 4 4 f 
                    e 5 5 5 4 4 4 f 
                    e 5 5 5 4 4 4 f 
                    . e 5 5 4 4 f . 
                    . . e 5 4 f . . 
                    . . . e f . . . 
                    `)
                profilelife.setEmptyLifeImage(img`
                    . . . . . . . . 
                    . e e . . f f . 
                    e d d e f e e f 
                    e d d d e e e f 
                    e d d d e e e f 
                    . e d d e e f . 
                    . . e d e f . . 
                    . . . e f . . . 
                    `)
                profilelife.setMaxLife(3)
                info.setLife(3)
                PlayingLevel = 5
                scene.cameraShake(4, 1000)
                mySprite4 = sprites.create(img`
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................ff..............................
                    ...............................................................................................................................ff...............................
                    .............................................................................................................................ffff...............................
                    ...........................................................................................................................fffff................................
                    ..........................................................................................................................fffff.................................
                    ........................................................................................................................fffffff.................................
                    ......................................................................................................................ffffffff..................................
                    ....................................................................................................................ffffffffff..................................
                    .................................................................................................................ffffffffffff...................................
                    ..............................................................................................................fffffffffffffff...................................
                    ............................................................................................................ffffffffffffffff....................................
                    .........................................................................................................fffffffffffffffffff....................................
                    .....................................................................................................ffffffffffffffffffffff.....................................
                    .................................................................................................ffffffffffffffffffffffffff.....................................
                    .............................................................................................fffffffffffffffffffffffffffff......................................
                    ...............ffff......................................................................fffffffffffffffffffffffffffffffff......................................
                    ................fffffff...............................................................fffffffffffffffffffffffffffffffffff.......................................
                    ..................fffffffff......................................................ffffffffffffffffffffffffffffffffffffffff.......................................
                    ...................ffffffffffff............................................fffffffffffffffffffffffffffffffffffffffffffff........................................
                    ....................ffffffffffffff.....................................fffffffffffffffffffffffffffffffffffffffffffffffff........................................
                    .....................ffffffffffffffffffffffffff..................fffffffffffffffffffffffffffffffffffffffffffffffffffffff........................................
                    .......................ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff.........................................
                    ........................fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff.........................................
                    .........................ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff11ffffff.........................................
                    ..........................fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111ffff..........................................
                    ...........................fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1111ffff..........................................
                    ............................ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1111ffff..........................................
                    .............................fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1111fff...........................................
                    ..............................ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111ffff...........................................
                    ................................ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111ffff...........................................
                    ................................ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111fffffffffffff111fff............................................
                    ..................................fffffffffff1111fffffffffffffffffffffffffffffffffffffffffff111fffffffffffffff111fff............................................
                    ..................................fffffffffff111111ffffffffffffffffffffffffffffffffffffffff11f1fffffff111fffff11ffff............................................
                    .....................................ffffffff11fff1fffffffffffffffffffffffffff111fffffffffffff1fffff111f11ffff11ffff............................................
                    ......................................fffffff11fff11ffffffffffffffffffffffffff1f11fffff1ffffff1fffff1ffff1fff111ffff............................................
                    .......................................ffffff11ffff11fffffffffffffffffffffffff1ff1ffff11ffffff1fffff1ffff1fff11fffff............................................
                    .......................................ffffff11ffff11fffffffffffff111ffff11fff1f11ffff11ffffff1fffff1ffff1fff11fffff............................................
                    .......................................ffffff11fffff1fff11ffffffff1111ff11ffff111fffff111fffff1fffff1ffff1ffffffffff............................................
                    .......................................ffffff11fffff1ff11fffff11ff1ff1ff1fffff11ffffff1f1fffff1fffff1ffff1ffffffffff............................................
                    ........................................fffff11fffff11f1ffff111fff1f11ff1fffff111fffff1f1fffff1fffff1ffff1fffffffffff...........................................
                    ........................................fffff11fffff11f1ffff1fffff111fff111fff1f11ffff1f1fffff11ffff1fff1fff1ffffffff...........................................
                    ........................................fffff11ffff11ff1f11f111fff11ffff1fffff1ff1fff11111fffff1ffff11f11fff11fffffff...........................................
                    .........................................ffff11ffff11ff111ffff11ff1fffff1fffff1ff11ff1fff1fffff1fffff111fff11ffffffff...........................................
                    .........................................ffff11ffff11ff11ffffff1ff1fffff1fffff1fff1ff1fff1fffff1fffffffffff1fffffffff...........................................
                    .........................................ffff111ff11ffff1f1ff1f1ff1fffff1111ff1ffffff1fff1fffffffffffffffffffffffffff...........................................
                    .........................................fffff111111ffff111ff111fffffffffffffffffffffffffffffffffffffffffffffffffffff...........................................
                    .........................................fffff11111fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff..........................................
                    .........................................fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff..........................................
                    .........................................fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff..........................................
                    .........................................fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff..........................................
                    ........................................ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff..........................................
                    ........................................ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff..........................................
                    ........................................fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff.........................................
                    ........................................fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff.........................................
                    ........................................ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff........................................
                    ........................................ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff........................................
                    .......................................ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff.......................................
                    .......................................ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff.......................................
                    .......................................fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......................................
                    ......................................fffffffffffffffffffffff............fffffffffffffffffffffffffffffffffffffffffffffffff......................................
                    ......................................ffffffffffffffffff......................................fffffffffffffffffffffffffffff.....................................
                    .....................................fffffffffffffff...............................................fffffffffffffffffffffffff....................................
                    .....................................fffffffffff...d.d.ddd.d.d.ddd...ddd.ddd.ddd.d.....ddd.ddd..............ffffffffffffffff....................................
                    .....................................ffffffff......d.d..d..d.d.d.....d...d.d.d.d.d......d..d....................fffffffffffff...................................
                    .....................................ffffff.............d..ddd.dd....d.d.d.d.ddd.d......d..ddd.......................ffffffff...................................
                    ....................................fffff...............d..d.d.d.....d.d.d.d.d.d.d......d....d...........................fffff..................................
                    ....................................fff.................d..d.d.ddd...ddd.ddd.d.d.ddd...ddd.ddd...............................f..................................
                    ................................................................................................................................................................
                    .....................................................444.4.4.444...ddd.ddd...ddd.ddd.ddd.ddd.d.d.d.d............................................................
                    .....................................................4.4.4.4..4....d.d.d.....d.d.d...d.d.d...d.d.d.d............................................................
                    .....................................................4.4.4.4..4....d.d.dd....ddd.dd..ddd.d...ddd................................................................
                    .....................................................4.4.4.4..4....d.d.d.....dd..d...d.d.d...d.d................................................................
                    .....................................................444.444..4....ddd.d.....d.d.ddd.d.d.ddd.d.d................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    `, SpriteKind.Text)
                mySprite4.x = scene.cameraProperty(CameraProperty.X)
                mySprite4.y = scene.cameraProperty(CameraProperty.Y)
                pause(3000)
                controller.moveSprite(mySprite, 70, 0)
                scene.cameraShake(4, 1000)
                sprites.destroy(mySprite4)
                mySprite3.setImage(img`
                    ..ddddddddddddddddd..
                    .ddddddddddddddddddd.
                    ddddcccdddddddcccdddd
                    dddcfffccdddccfffcddd
                    dddfeeeffcdcffeeefddd
                    dddeeeeeefcfeeeeeeddd
                    ddde444eefcfee444eddd
                    ddd45554edcde45554ddd
                    ddde444edfcfde444eddd
                    edddeeeddfdfddeeeddde
                    ddddddddfdcdfdddddddd
                    edddccfdffdffdfccddde
                    edfcccffefffeffcccfde
                    edfccceeeeeeeeecccfde
                    edfccddeeeeeeeddccfde
                    edefddddfffffddddfede
                    edeeefdfffffffdfeeede
                    eedeefdffeeeffdfeedee
                    .eedddfeeeeeeefdddee.
                    ..eeeeeeeeeeeeeeeee..
                    `)
                mySprite3.vx = -20
            })
        } else {
            mySprite.sayText("A", 50, false)
        }
    } else {
        mySprite.sayText("Complete 3 Levels to Face.", 100, false)
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile90`, function (sprite, location) {
    if (LevelsDone >= 0) {
        if (controller.A.isPressed()) {
            timer.after(1, function () {
                controller.moveSprite(mySprite, 0, 0)
                tiles.setTileAt(location, assets.tile`transparency8`)
                music.stopAllSounds()
                music.play(music.createSong(hex`0078000408020109010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c8000a0000000100050405060708`), music.PlaybackMode.InBackground)
                scene.cameraShake(4, 500)
                color.startFadeFromCurrent(color.White, 1000)
                pause(5000)
                sprites.destroyAllSpritesOfKind(SpriteKind.Text)
                color.startFadeFromCurrent(color.originalPalette, 200)
                tiles.setCurrentTilemap(tileUtil.createSmallMap(tilemap`level26`))
                tiles.placeOnTile(mySprite, tiles.getTileLocation(146, 7))
                Simulate_Spikes()
                music.play(music.createSong(hex`0064000408080600001c00010a006400f401640000040000000000000000000000000005000004280180008200011982008400012084008600019c86008800011b88008a0001198a008c0001208c008e00019c8e009000011b90009200011992009400012094009600019c96009800011b98009a0001199a009c0001209c009e00019c9e00a000011ba000a2000119a200a40001a1a400a600019ca600a800011ba800aa000119aa00ac0001a1ac00ae00019cae00b000011bb000b2000119b200b400011eb400b600019cb600b800011bb800ba000119ba00bc000120bc00be00019cbe00c000011bc000c2000119e000e2000119e200e4000120e400e600019ce600e800011be800ea000119ea00ec000120ec00ee00019cee00f000011bf000f2000119f200f4000120f400f6000119f600f8000120f800fa000119fa00fc000120fc00fe000125fe000001030d192503001c0001dc00690000045e0100040000000000000000000005640001040003600010001800019c18002000011b20003000019730004000011850005800019c58006000011b60007000019770008000011890009800019c9800a000011ba000b0000197b000c0000118d000d800019cd800e000011be000f0000197f0000001011805001c000f0a006400f4010a000004000000000000000000000000000000000232010000020001190400060001190a000c0001190c000e0001190e00100001192000220001192600280001192c002e0001192e00300001194000420001194600480001194a004c0001194c004e0001194e005000011960006200011962006400011966006800011968006a0001196c006e00011990009200011992009400010d94009600010d96009800011998009a00010d9a009c00010d9c009e0001199e00a000010db000b2000119b200b400010db400b600010db600b8000119b800ba00010dba00bc00010dbc00be000119be00c000010dd000d2000119d200d400010dd400d600010dd600d8000119d800da00010dda00dc00010ddc00de000119de00e000010df000f2000119f200f400010df400f600010df600f8000119f800fa00010dfa00fc00010dfc00fe000119fe000001010d07001c00020a006400f401640000040000000000000000000000000000000003e40000000200011910001200019c14001600012018001a00011b2000220001952400260001a12a002c0001a12e00300001a130003200011e38003a00012050005200019c54005600012058005a00011b6000620001956400660001956a006c0001956e007000019570007200019778007a00011480008200011990009200019c94009600012098009a00011ba000a2000195a400a60001a1aa00ac0001a1ae00b00001a1b000b200011eb800ba000120d000d200019cd400d6000120d800da00011be000e2000195e400e6000195ea00ec000195ee00f0000195f000f2000197f800fa00011408001c000e050046006603320000040a002d0000006400140001320002010002500100000200010d02000400010d04000600010d06000800010d0a000c00010d0c000e00010d0e001000010d20002200010d22002400010d24002600010d26002800010d2a002c00010d2c002e00010d2e003000010d40004200010d42004400010d44004600010d46004800010d4a004c00010d4c004e00010d4e005000010d60006200010d62006400010d64006600010d66006800010d6a006c00010d6c006e00010d6e007000010d80008200010d82008400010d84008600010d86008800010d8a008c00010d8c008e00010d8e009000010da000a200010da200a400010da400a600010da600a800010daa00ac00010dac00ae00010dae00b000010dc000c200010dc200c400010dc400c600010dc600c800010dca00cc00010dcc00ce00010dce00d000010de000e200010de200e400010de400e600010de600e800010dea00ec00010dec00ee00010dee00f000010d09010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c8006a010000010001030800090001031000110001031800190001032000210001032800290001033000310001033800390001034000410001034800490001035000510001035800590001036000610001036800690001037000710001037800790001038000810001038200830001068400850001068800890001038a008b0001068e008f0001069000910001039400950001069600970001069800990001039c009d000106a000a1000103a200a3000106a600a7000106a800a9000103aa00ab000106ac00ad000106b000b1000103b400b5000106b600b7000106b800b9000103bc00bd000106c000c10003151603c400c5000106c600c7000106c800c9000103ca00cb000106ce00cf000106d000d1000103d200d3000106d400d5000106d800d9000103dc00dd000106e000e1000103e400e5000106e600e7000106e800e9000103ea00eb000106ec00ed000106f000f1000103f200f3000106f600f7000106f800f9000103fc00fd000106`), music.PlaybackMode.LoopingInBackground)
                controller.moveSprite(mySprite, 0, 0)
                mySprite3 = sprites.create(img`
                    .....fffffffffff.....
                    ....fffffffffffff....
                    ...fffffffffffffff...
                    ..fffffffffffffffff..
                    .fffffffffffffffffff.
                    fffffffffffffffffffff
                    feffeefffffffffeeffff
                    feff4defffffffed4ffef
                    fefff44ddfffcd44fffef
                    ffefff444ccd444ffffef
                    ffefffff4f44ff4fffeff
                    fffeffffffffffffffeff
                    fffeffffffffeffffefff
                    ffffefffeffefefffefff
                    fffffefefeefffefeffff
                    ffffffeffffffffefffff
                    fffffffffffffffffffff
                    fff.f.fff.fffffff.fff
                    ff.....f...fff.f...ff
                    f...........f.......f
                    `, SpriteKind.Boss)
                mySprite3.setScale(2, ScaleAnchor.Middle)
                tiles.placeOnTile(mySprite3, tiles.getTileLocation(146, 11))
                profilelife.setFilledLifeImage(img`
                    . . . . . . . . 
                    . e e . . f f . 
                    e 5 5 e f 4 4 f 
                    e 5 5 5 4 4 4 f 
                    e 5 5 5 4 4 4 f 
                    . e 5 5 4 4 f . 
                    . . e 5 4 f . . 
                    . . . e f . . . 
                    `)
                profilelife.setEmptyLifeImage(img`
                    . . . . . . . . 
                    . e e . . f f . 
                    e d d e f e e f 
                    e d d d e e e f 
                    e d d d e e e f 
                    . e d d e e f . 
                    . . e d e f . . 
                    . . . e f . . . 
                    `)
                profilelife.setMaxLife(3)
                info.setLife(3)
                PlayingLevel = 15
                scene.cameraShake(4, 1000)
                mySprite4 = sprites.create(img`
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................ff..............................
                    ...............................................................................................................................ff...............................
                    .............................................................................................................................ffff...............................
                    ...........................................................................................................................fffff................................
                    ..........................................................................................................................fffff.................................
                    ........................................................................................................................fffffff.................................
                    ......................................................................................................................ffffffff..................................
                    ....................................................................................................................ffffffffff..................................
                    .................................................................................................................ffffffffffff...................................
                    ..............................................................................................................fffffffffffffff...................................
                    ............................................................................................................ffffffffffffffff....................................
                    .........................................................................................................fffffffffffffffffff....................................
                    .....................................................................................................ffffffffffffffffffffff.....................................
                    .................................................................................................ffffffffffffffffffffffffff.....................................
                    .............................................................................................fffffffffffffffffffffffffffff......................................
                    ...............ffff......................................................................fffffffffffffffffffffffffffffffff......................................
                    ................fffffff...............................................................fffffffffffffffffffffffffffffffffff.......................................
                    ..................fffffffff......................................................ffffffffffffffffffffffffffffffffffffffff.......................................
                    ...................ffffffffffff............................................fffffffffffffffffffffffffffffffffffffffffffff........................................
                    ....................ffffffffffffff.....................................fffffffffffffffffffffffffffffffffffffffffffffffff........................................
                    .....................ffffffffffffffffffffffffff..................fffffffffffffffffffffffffffffffffffffffffffffffffffffff........................................
                    .......................ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff.........................................
                    ........................fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff.........................................
                    .........................ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff11ffffff.........................................
                    ..........................fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111ffff..........................................
                    ...........................fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1111ffff..........................................
                    ............................ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1111ffff..........................................
                    .............................fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1111fff...........................................
                    ..............................ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111ffff...........................................
                    ................................ffffffffffffffff1111ffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111ffff...........................................
                    ................................fffffffffffff11111111fffffffffffffffffffffffffffffffffffffffffffffffffffffffff111fff............................................
                    ..................................fffffffffff111ffff11ffffffffffffffffffffffffffffffffffffffffffffffffffffffff111fff............................................
                    ..................................fffffffffff111ffff11ffffffffffffffffffffffffffffffffffffffffffffffffffffffff11ffff............................................
                    .....................................ffffffffff11fff11ffffffffffffffffffffffffffffffffffffffffffffffffffffffff11ffff............................................
                    ......................................fffffffff11fff11fffffffffffffffffffffffffffffffffffffffffffff1fffffffff111ffff............................................
                    .......................................ffffffff11fff11fffffffffffffffffffffffffffffffffffffffffffff11ffffffff11fffff............................................
                    .......................................fffffffff1fff11fffffffffffffffffffffffffff1111ffffff1fffffff11ffffffff11fffff............................................
                    .......................................fffffffff1fff11fffffffffffffff11111ffff1fff1111111ff11ffffff111ffffffffffffff............................................
                    .......................................fffffffff1ff11ffffffffffffffff1fff11fff1fffff111f11f11ffffff1f1ffffffffffffff............................................
                    ........................................ffffffff11111fffff1ffff1111ff11fff1fff11ffff111ffff11fffff11f11ffffffffffffff...........................................
                    ........................................ffffffff111fffffff1fff11ffffff11111fff11ffff111fffff1fffff1fff11ffff1ffffffff...........................................
                    ........................................fffffffff11fffffff1fff1fffffff11fffffff11fff111fffff11fff11f1111ffff11fffffff...........................................
                    .........................................ffffffff11ffffff11fff1ff1111f111ffffff11fff111fffff11fff1111ff11ff11ffffffff...........................................
                    .........................................ffffffff11ffffff11fff1ff1111f111ffffff11fff111fffff11fff111fff11ff1fffffffff...........................................
                    .........................................ffffffff11ffffff11fff1ffff11ff1111ffff11fff111fffff11fff11ffff11ffffffffffff...........................................
                    .........................................fffffffff1ffffff11fff11ffff1ff1ff111ff1fffff111fffff1fff11fffff1ffffffffffff...........................................
                    .........................................fffffffff11fffff11fff1111111ff1fff11ff1fffff111fffff1fff1ffffff11ffffffffffff..........................................
                    .........................................fffffffff11fffff11ffff11111fffffffffffffffffff1fffffffff1fffffff1ffffffffffff..........................................
                    .........................................fffffffff11fffff1fffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffff..........................................
                    .........................................fffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff..........................................
                    ........................................ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff..........................................
                    ........................................ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff..........................................
                    ........................................fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff.........................................
                    ........................................fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff.........................................
                    ........................................ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff........................................
                    ........................................ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff........................................
                    .......................................ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff.......................................
                    .......................................ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff.......................................
                    .......................................fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......................................
                    ......................................fffffffffffffffffffffff............fffffffffffffffffffffffffffffffffffffffffffffffff......................................
                    ......................................ffffffffffffffffff......................................fffffffffffffffffffffffffffff.....................................
                    .....................................fffffffffffffff...............................................fffffffffffffffffffffffff....................................
                    .....................................fffffffffff.....d.d.d...d.d.d.d.d...444.444.44.4.4.444.................ffffffffffffffff....................................
                    .....................................ffffffff........d.d.d...d.d.d.d.d...4...4.4.44.4.4..4......................fffffffffffff...................................
                    .....................................ffffff..............d...d.ddd.ddd...4...444.4.44....4...........................ffffffff...................................
                    ....................................fffff................d.d.d.d.d..d....4...4.4.4.44....4...............................fffff..................................
                    ....................................fff..................dd.dd.d.d..d....444.4.4.4.44....4...................................f..................................
                    ................................................................................................................................................................
                    ................................................d...d.ddd...ddd.d.d.ddd.ddd...d...d.ddd.ddd.ddd.d.d.............................................................
                    ................................................d...d.d.......d.d.d.d....d....d...d.d.d..d...d..d.d.............................................................
                    ................................................d...d.dd......d.d.d.ddd..d....d...d.ddd..d...d..................................................................
                    ................................................d.d.d.d.....d.d.d.d...d..d....d.d.d.d.d..d...d..................................................................
                    ................................................dd.dd.ddd...ddd.ddd.ddd..d....dd.dd.d.d.ddd..d..................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    ................................................................................................................................................................
                    `, SpriteKind.Text)
                mySprite4.x = scene.cameraProperty(CameraProperty.X)
                mySprite4.y = scene.cameraProperty(CameraProperty.Y)
                pause(3000)
                controller.moveSprite(mySprite, 70, 0)
                scene.cameraShake(4, 1000)
                sprites.destroy(mySprite4)
            })
        } else {
            mySprite.sayText("A", 50, false)
        }
    } else {
        mySprite.sayText("Complete 10 Levels to Face.", 100, false)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.BuzzSaw, function (sprite, otherSprite) {
    scene.cameraShake(4, 500)
    characterAnimations.setCharacterAnimationsEnabled(mySprite, false)
    animation.runImageAnimation(
    mySprite,
    [img`
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        f . . . f . f . 
        f . . . f f f . 
        . f f f 1 f 1 . 
        . . f f f f f . 
        . f . . . f . f 
        `,img`
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        5 . . . 5 . 5 . 
        5 . . . 5 5 5 . 
        . 5 5 5 4 5 4 . 
        . . 5 5 5 5 5 . 
        . 5 . . . 5 . 5 
        `],
    50,
    true
    )
    music.play(music.createSoundEffect(
    WaveShape.Noise,
    2471,
    2313,
    600,
    0,
    200,
    SoundExpressionEffect.Vibrato,
    InterpolationCurve.Logarithmic
    ), music.PlaybackMode.InBackground)
    info.changeLifeBy(-1)
    mySprite.setFlag(SpriteFlag.GhostThroughSprites, true)
    otherSprite.setKind(SpriteKind.Nothing)
    timer.after(500, function () {
        animation.stopAnimation(animation.AnimationTypes.All, mySprite)
        otherSprite.setKind(SpriteKind.BuzzSaw)
        mySprite.setFlag(SpriteFlag.GhostThroughSprites, false)
        characterAnimations.setCharacterAnimationsEnabled(mySprite, true)
    })
})
function SubCycle () {
    if (Orb == 2) {
        CycleLevel += -1
        if (CycleLevel == 1) {
            mySprite5.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . d d d 3 3 3 . . . . . 
                . . . . d d d d 3 3 3 3 . . . . 
                . . . d d d d d 3 3 3 3 d . . . 
                . . d d d d d d 3 3 3 d d d . . 
                . . d d d d d d 3 3 d d d d . . 
                . . d d d d d f f d d d d d . . 
                . . d d d d d f f d d d d d . . 
                . . d d d d d d d d d d d d . . 
                . . d d d d d d d d d d d d . . 
                . . e d d d d d d d d d d e . . 
                . . . e d d d d d d d d e . . . 
                . . . . e d d d d d d e . . . . 
                . . . . . e e e e e e . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
        } else {
            if (CycleLevel == 2) {
                mySprite5.setImage(img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . d d d 3 3 3 . . . . . 
                    . . . . d d d d 3 3 3 3 . . . . 
                    . . . d d d d d 3 3 3 3 3 . . . 
                    . . d d d d d d 3 3 3 3 3 3 . . 
                    . . d d d d d d 3 3 3 3 3 3 . . 
                    . . d d d d d f f 3 3 3 3 3 . . 
                    . . d d d d d f f d d d d d . . 
                    . . d d d d d d d d d d d d . . 
                    . . d d d d d d d d d d d d . . 
                    . . e d d d d d d d d d d e . . 
                    . . . e d d d d d d d d e . . . 
                    . . . . e d d d d d d e . . . . 
                    . . . . . e e e e e e . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `)
            } else {
                if (CycleLevel == 3) {
                    mySprite5.setImage(img`
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . d d d 3 3 3 . . . . . 
                        . . . . d d d d 3 3 3 3 . . . . 
                        . . . d d d d d 3 3 3 3 3 . . . 
                        . . d d d d d d 3 3 3 3 3 3 . . 
                        . . d d d d d d 3 3 3 3 3 3 . . 
                        . . d d d d d f f 3 3 3 3 3 . . 
                        . . d d d d d f f 3 3 3 3 3 . . 
                        . . d d d d d d d 3 3 3 3 3 . . 
                        . . d d d d d d d d 3 3 3 3 . . 
                        . . e d d d d d d d d 3 3 2 . . 
                        . . . e d d d d d d d d 2 . . . 
                        . . . . e d d d d d d e . . . . 
                        . . . . . e e e e e e . . . . . 
                        . . . . . . . . . . . . . . . . 
                        `)
                } else {
                    if (CycleLevel == 4) {
                        mySprite5.setImage(img`
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . d d d 3 3 3 . . . . . 
                            . . . . d d d d 3 3 3 3 . . . . 
                            . . . d d d d d 3 3 3 3 3 . . . 
                            . . d d d d d d 3 3 3 3 3 3 . . 
                            . . d d d d d d 3 3 3 3 3 3 . . 
                            . . d d d d d f f 3 3 3 3 3 . . 
                            . . d d d d d f f 3 3 3 3 3 . . 
                            . . d d d d d d 3 3 3 3 3 3 . . 
                            . . d d d d d d 3 3 3 3 3 3 . . 
                            . . e d d d d d 3 3 3 3 3 2 . . 
                            . . . e d d d d 3 3 3 3 2 . . . 
                            . . . . e d d d 3 3 3 2 . . . . 
                            . . . . . e e e 2 2 2 . . . . . 
                            . . . . . . . . . . . . . . . . 
                            `)
                    } else {
                        if (CycleLevel == 5) {
                            mySprite5.setImage(img`
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . d d d 3 3 3 . . . . . 
                                . . . . d d d d 3 3 3 3 . . . . 
                                . . . d d d d d 3 3 3 3 3 . . . 
                                . . d d d d d d 3 3 3 3 3 3 . . 
                                . . d d d d d d 3 3 3 3 3 3 . . 
                                . . d d d d d f f 3 3 3 3 3 . . 
                                . . d d d d d f f 3 3 3 3 3 . . 
                                . . d d d d 3 3 3 3 3 3 3 3 . . 
                                . . d d d 3 3 3 3 3 3 3 3 3 . . 
                                . . e d 3 3 3 3 3 3 3 3 3 2 . . 
                                . . . e 3 3 3 3 3 3 3 3 2 . . . 
                                . . . . 2 3 3 3 3 3 3 2 . . . . 
                                . . . . . 2 2 2 2 2 2 . . . . . 
                                . . . . . . . . . . . . . . . . 
                                `)
                        } else {
                            if (CycleLevel == 6) {
                                mySprite5.setImage(img`
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . d d d 3 3 3 . . . . . 
                                    . . . . d d d d 3 3 3 3 . . . . 
                                    . . . d d d d d 3 3 3 3 3 . . . 
                                    . . d d d d d d 3 3 3 3 3 3 . . 
                                    . . d d d d d d 3 3 3 3 3 3 . . 
                                    . . d d d d d f f 3 3 3 3 3 . . 
                                    . . 3 3 3 3 3 f f 3 3 3 3 3 . . 
                                    . . 3 3 3 3 3 3 3 3 3 3 3 3 . . 
                                    . . 3 3 3 3 3 3 3 3 3 3 3 3 . . 
                                    . . 2 3 3 3 3 3 3 3 3 3 3 2 . . 
                                    . . . 2 3 3 3 3 3 3 3 3 2 . . . 
                                    . . . . 2 3 3 3 3 3 3 2 . . . . 
                                    . . . . . 2 2 2 2 2 2 . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    `)
                            } else {
                                if (CycleLevel == 7) {
                                    mySprite5.setImage(img`
                                        . . . . . . . . . . . . . . . . 
                                        . . . . . . . . . . . . . . . . 
                                        . . . . . d d d 3 3 3 . . . . . 
                                        . . . . d d d d 3 3 3 3 . . . . 
                                        . . . 3 3 d d d 3 3 3 3 3 . . . 
                                        . . 3 3 3 3 d d 3 3 3 3 3 3 . . 
                                        . . 3 3 3 3 3 d 3 3 3 3 3 3 . . 
                                        . . 3 3 3 3 3 f f 3 3 3 3 3 . . 
                                        . . 3 3 3 3 3 f f 3 3 3 3 3 . . 
                                        . . 3 3 3 3 3 3 3 3 3 3 3 3 . . 
                                        . . 3 3 3 3 3 3 3 3 3 3 3 3 . . 
                                        . . 2 3 3 3 3 3 3 3 3 3 3 2 . . 
                                        . . . 2 3 3 3 3 3 3 3 3 2 . . . 
                                        . . . . 2 3 3 3 3 3 3 2 . . . . 
                                        . . . . . 2 2 2 2 2 2 . . . . . 
                                        . . . . . . . . . . . . . . . . 
                                        `)
                                } else {
                                    if (CycleLevel == 0) {
                                        mySprite5.setImage(img`
                                            . . . . . . . . . . . . . . . . 
                                            . . . . . . . . . . . . . . . . 
                                            . . . . . d d d d d d . . . . . 
                                            . . . . d d d d d d d d . . . . 
                                            . . . d d d d d d d d d d . . . 
                                            . . d d d d d d d d d d d d . . 
                                            . . d d d d d d d d d d d d . . 
                                            . . d d d d d f f d d d d d . . 
                                            . . d d d d d f f d d d d d . . 
                                            . . d d d d d d d d d d d d . . 
                                            . . d d d d d d d d d d d d . . 
                                            . . e d d d d d d d d d d e . . 
                                            . . . e d d d d d d d d e . . . 
                                            . . . . e d d d d d d e . . . . 
                                            . . . . . e e e e e e . . . . . 
                                            . . . . . . . . . . . . . . . . 
                                            `)
                                        Orb = 1
                                        GameStart = 1
                                        controller.moveSprite(mySprite, 70, 0)
                                        mySprite.ay = 180
                                        CycleLevel = 0
                                        music.play(music.createSoundEffect(
                                        WaveShape.Noise,
                                        694,
                                        633,
                                        600,
                                        0,
                                        600,
                                        SoundExpressionEffect.Vibrato,
                                        InterpolationCurve.Logarithmic
                                        ), music.PlaybackMode.InBackground)
                                        mySprite5.setImage(img`
                                            . . . . . . . . . . . . . . . . 
                                            . . . . . . . . . . . . . . . . 
                                            . . . . . d d d d d d . . . . . 
                                            . . . . d d d d d d d d . . . . 
                                            . . . d d d d d d d d d d . . . 
                                            . . d d d d d d d d d d d d . . 
                                            . . d d d d d d d d d d d d . . 
                                            . . d d d d d f f d d d d d . . 
                                            . . d d d d d f f d d d d d . . 
                                            . . d d d d d d d d d d d d . . 
                                            . . d d d d d d d d d d d d . . 
                                            . . e d d d d d d d d d d e . . 
                                            . . . e d d d d d d d d e . . . 
                                            . . . . e d d d d d d e . . . . 
                                            . . . . . e e e e e e . . . . . 
                                            . . . . . . . . . . . . . . . . 
                                            `)
                                        animation.stopAnimation(animation.AnimationTypes.All, mySprite)
                                        characterAnimations.setCharacterAnimationsEnabled(mySprite, true)
                                    } else {
                                        CycleLevel = 0
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        pause(200)
        SubCycle()
    }
}
sprites.onOverlap(SpriteKind.Boss2, SpriteKind.Saw, function (sprite, otherSprite) {
    scene.cameraShake(4, 500)
    characterAnimations.setCharacterAnimationsEnabled(mySprite, false)
    animation.runImageAnimation(
    mySprite,
    [img`
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        f . . . f . f . 
        f . . . f f f . 
        . f f f 1 f 1 . 
        . . f f f f f . 
        . f . . . f . f 
        `,img`
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        5 . . . 5 . 5 . 
        5 . . . 5 5 5 . 
        . 5 5 5 4 5 4 . 
        . . 5 5 5 5 5 . 
        . 5 . . . 5 . 5 
        `],
    50,
    true
    )
    music.play(music.createSoundEffect(
    WaveShape.Noise,
    2471,
    2313,
    600,
    0,
    200,
    SoundExpressionEffect.Vibrato,
    InterpolationCurve.Logarithmic
    ), music.PlaybackMode.InBackground)
    info.changeLifeBy(-1)
    mySprite.setFlag(SpriteFlag.GhostThroughSprites, true)
    otherSprite.setImage(img`
        . . . d d . . . 
        . . d e e d . . 
        . d e f f e d . 
        d e f f f f e d 
        d e f f f f e d 
        . d e f f e d . 
        . . d e e d . . 
        . . . d d . . . 
        `)
    otherSprite.setKind(SpriteKind.Nothing)
    timer.after(1000, function () {
        animation.stopAnimation(animation.AnimationTypes.All, mySprite)
        otherSprite.setKind(SpriteKind.Saw)
        otherSprite.setImage(img`
            . . . 5 5 . . . 
            . . 5 4 4 5 . . 
            . 5 4 f f 4 5 . 
            5 4 f f f f 4 5 
            5 4 f f f f 4 5 
            . 5 4 f f 4 5 . 
            . . 5 4 4 5 . . 
            . . . 5 5 . . . 
            `)
        mySprite.setFlag(SpriteFlag.GhostThroughSprites, false)
        characterAnimations.setCharacterAnimationsEnabled(mySprite, true)
    })
})
sprites.onOverlap(SpriteKind.Boss2, SpriteKind.Setup, function (sprite, otherSprite) {
    otherSprite.setKind(SpriteKind.Nothing)
    timer.after(500, function () {
        otherSprite.setKind(SpriteKind.Spike)
        extraEffects.createSpreadEffectOnAnchor(otherSprite, extraEffects.createSingleColorSpreadEffectData(5, ExtraEffectPresetShape.Spark), 100)
        otherSprite.setImage(img`
            . . . . . . . . 
            . . . 5 5 . . . 
            . . . 5 5 . . . 
            . . 5 4 4 5 . . 
            . . 5 4 4 5 . . 
            . 5 4 f f 4 5 . 
            . 5 4 f f 4 5 . 
            5 4 f f f f 4 5 
            `)
        music.play(music.createSong(hex`0078000408020109010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c8000600000001000113`), music.PlaybackMode.InBackground)
        timer.after(500, function () {
            otherSprite.setKind(SpriteKind.Setup)
            otherSprite.setImage(img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . 5 5 . . . 
                . . . 5 5 . . . 
                . . 5 4 4 5 . . 
                `)
        })
    })
})
scene.onHitWall(SpriteKind.Shot, function (sprite, location) {
    sprites.destroy(sprite)
})
function PhasedBack () {
    for (let value of tiles.getTilesByType(assets.tile`myTile85`)) {
        tiles.setWallAt(value, false)
        tiles.setTileAt(value, assets.tile`myTile101`)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile83`)) {
        tiles.setWallAt(value, false)
        tiles.setTileAt(value, assets.tile`myTile85`)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile101`)) {
        tiles.setWallAt(value, true)
        tiles.setTileAt(value, assets.tile`myTile83`)
    }
    if (PlayingLevel == 15) {
        animation.stopAnimation(animation.AnimationTypes.All, mySprite3)
        mySprite3.setImage(img`
            .....fffffffffff.....
            ....fffffffffffff....
            ...fffffffffffffff...
            ..fffffffffffffffff..
            .fffffffffffffffffff.
            fffffffffffffffffffff
            feffeefffffffffeeffff
            feff4defffffffed4ffef
            fefff44ddfffcd44fffef
            ffefff444ccd444ffffef
            ffefffff4f44ff4fffeff
            fffeffffffffffffffeff
            fffeffffffffeffffefff
            ffffefffeffefefffefff
            fffffefefeefffefeffff
            ffffffeffffffffefffff
            fffffffffffffffffffff
            fff.f.fff.fffffff.fff
            ff.....f...fff.f...ff
            f...........f.......f
            `)
        mySprite3.setVelocity(0, 0)
    }
    if (Skin == 0) {
        characterAnimations.loopFrames(
        mySprite,
        [img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f 1 f 1 . 
            . . f f f f f . 
            . . f . f . f . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f 1 f 1 . 
            . . f f f f f . 
            . . f . f . f . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f 1 f 1 . 
            . . f f f f f . 
            . . f . f . f . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f 1 f 1 . 
            . . f f f f f . 
            . . f . f . f . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f 1 f 1 . 
            . . f f f f f . 
            . . f . f . f . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f 1 f 1 . 
            . . f f f f f . 
            . . f . f . f . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f 1 f 1 . 
            . . f f f f f . 
            . . f . f . f . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f 1 f 1 . 
            . . f f f f f . 
            . . f . f . f . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f 1 f 1 . 
            . . f f f f f . 
            . . f . f . f . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f 1 f 1 . 
            . . f f f f f . 
            . . f . f . f . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f f f f . 
            . . f f f f f . 
            . . f . f . f . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f 1 f 1 . 
            . . f f f f f . 
            . . f . f . f . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f 1 f 1 . 
            . . f f f f f . 
            . . f . f . f . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f 1 f 1 . 
            . . f f f f f . 
            . . f . f . f . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f 1 f 1 . 
            . . f f f f f . 
            . . f . f . f . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f 1 f 1 . 
            . . f f f f f . 
            . . f . f . f . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f 1 f 1 . 
            . . f f f f f . 
            . . f . f . f . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f 1 f 1 . 
            . . f f f f f . 
            . . f . f . f . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f 1 f 1 . 
            . . f f f f f . 
            . . f . f . f . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f 1 f 1 . 
            . . f f f f f . 
            . . f . f . f . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f 1 f 1 . 
            . . f f f f f . 
            . . f . f . f . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f 1 f 1 . 
            . . f f f f f . 
            . . f . f . f . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f 1 f 1 . 
            . . f f f f f . 
            . . f . f . f . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f 1 f 1 . 
            . . f f f f f . 
            . . f . f . f . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f 1 f 1 . 
            . . f f f f f . 
            . . f . f . f . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f f f f . 
            . . f f f f f . 
            . . f . f . f . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f f f f . 
            . . f f f f f . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f f f f . 
            . . f f f f f . 
            `,img`
            . 4 4 4 . . . . 
            . . 4 4 . . . . 
            . 4 4 . . . . . 
            . 4 4 4 . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f f f f . 
            . . f f f f f . 
            `,img`
            . 4 4 4 . . . . 
            . . 4 4 . . . . 
            . 4 4 . . . . . 
            . 4 4 4 . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f f f f . 
            . . f f f f f . 
            `,img`
            . 5 5 5 . . . . 
            . . 5 5 . . . . 
            . 5 5 . . . . . 
            . 5 5 5 . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f f f f . 
            . . f f f f f . 
            `,img`
            . 4 4 4 . . . . 
            . . 4 4 . . . . 
            . 4 4 . . . . . 
            . 4 4 4 . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f f f f . 
            . . f f f f f . 
            `,img`
            . 5 5 5 . . . . 
            . . 5 5 . . . . 
            . 5 5 . . . . . 
            . 5 5 5 . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f f f f . 
            . . f f f f f . 
            `,img`
            . 4 4 4 . . . . 
            . . 4 4 . . . . 
            . 4 4 . . . . . 
            . 4 4 4 . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f f f f . 
            . . f f f f f . 
            `,img`
            . 5 5 5 . . . . 
            . . 5 5 . . . . 
            . 5 5 . . . . . 
            . 5 5 5 . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f f f f . 
            . . f f f f f . 
            `,img`
            . 4 4 4 . . . . 
            . . 4 4 . . . . 
            . 4 4 . . . . . 
            . 4 4 4 . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f f f f . 
            . . f f f f f . 
            `,img`
            . 5 5 5 . . . . 
            . . 5 5 . . . . 
            . 5 5 . . . . . 
            . 5 5 5 . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f f f f . 
            . . f f f f f . 
            `,img`
            . 4 4 4 . . . . 
            . . 4 4 . . . . 
            . 4 4 . . . . . 
            . 4 4 4 . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f f f f . 
            . . f f f f f . 
            `,img`
            . 5 5 5 . . . . 
            . . 5 5 . . . . 
            . 5 5 . . . . . 
            . 5 5 5 . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f f f f . 
            . . f f f f f . 
            `,img`
            . . 5 . . . . . 
            . . . 5 . . . . 
            . . 5 . . . . . 
            . 5 . 5 . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f f f f . 
            . . f f f f f . 
            `,img`
            . . . . . . . . 
            . . . 5 . . . . 
            . . 5 . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f f f f . 
            . . f f f f f . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f 1 f 1 . 
            . . f f f f f . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f 1 f 1 . 
            . . f f f f f . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f 1 f 1 . 
            . . f f f f f . 
            . . f . f . f . 
            `],
        200,
        characterAnimations.rule(Predicate.NotMoving)
        )
        characterAnimations.loopFrames(
        mySprite,
        [img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . f . f . . . f 
            . f f f . . . f 
            . 1 f 1 f f f . 
            . f f f f f . . 
            f . f . . . f . 
            `],
        200,
        characterAnimations.rule(Predicate.MovingUp, Predicate.FacingLeft)
        )
        characterAnimations.loopFrames(
        mySprite,
        [img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . f . 
            . f . f . . f . 
            . f f f . . f . 
            . 1 f 1 f f . . 
            . f f f f f . . 
            f . f . f . . . 
            `],
        200,
        characterAnimations.rule(Predicate.MovingDown, Predicate.FacingLeft)
        )
        characterAnimations.loopFrames(
        mySprite,
        [img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f 1 f 1 . 
            . . f f f f f . 
            . f . . . f . f 
            `],
        200,
        characterAnimations.rule(Predicate.MovingUp, Predicate.FacingRight)
        )
        characterAnimations.loopFrames(
        mySprite,
        [img`
            . . . . . . . . 
            . . . . . . . . 
            . f . . . . . . 
            . f . . f . f . 
            . f . . f f f . 
            . . f f 1 f 1 . 
            . . f f f f f . 
            . . . f . f . f 
            `],
        200,
        characterAnimations.rule(Predicate.MovingDown, Predicate.FacingRight)
        )
        characterAnimations.loopFrames(
        mySprite,
        [img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f 1 f 1 . 
            . . f f f f f . 
            . f . . . f . f 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f 1 f 1 . 
            . . f f f f f . 
            `],
        200,
        characterAnimations.rule(Predicate.MovingRight)
        )
        characterAnimations.loopFrames(
        mySprite,
        [img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . f . f . . . f 
            . f f f . . . f 
            . 1 f 1 f f f . 
            . f f f f f . . 
            f . f . . . f . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . f . f . . . f 
            . f f f . . . f 
            . 1 f 1 f f f . 
            . f f f f f . . 
            `],
        200,
        characterAnimations.rule(Predicate.MovingLeft)
        )
        Skin = 0
    }
    if (Skin == 1) {
        if (Perfects >= 3) {
            characterAnimations.loopFrames(
            mySprite,
            [img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 1 f 1 . 
                . . f f 4 f 4 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 1 f 1 . 
                . . f f 4 f 4 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 1 f 1 . 
                . . f f 4 f 4 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . e . e . e . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . e . e . e . 
                . . e . e . e . 
                . . f . f . f . 
                `,img`
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . e . e . e . 
                . . e . e . e . 
                . . e . e . e . 
                . . f . f . f . 
                `,img`
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . e . e . e . 
                . . e . e . e . 
                . . e . e . e . 
                . . 4 . f . f . 
                `,img`
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . e . e . e . 
                . . e . e . e . 
                . . e . e . e . 
                . . f . 4 . f . 
                `,img`
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . e . e . e . 
                . . e . e . e . 
                . . e . e . e . 
                . . f . f . 4 . 
                `,img`
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . e . e . e . 
                . . e . e . e . 
                . . e . e . e . 
                . . 4 . f . f . 
                `,img`
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . e . e . e . 
                . . e . e . e . 
                . . e . e . e . 
                . . f . 4 . f . 
                `,img`
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . e . e . e . 
                . . e . e . e . 
                . . e . e . e . 
                . . f . f . 4 . 
                `,img`
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . e . e . e . 
                . . e . e . e . 
                . . e . e . e . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . e . e . e . 
                . . e . e . e . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . e . e . e . 
                . . e . e . e . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . e . e . e . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . f . f . f . 
                `],
            200,
            characterAnimations.rule(Predicate.NotMoving)
            )
            characterAnimations.loopFrames(
            mySprite,
            [img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . 4 . 4 . . . 5 
                . f f f . . . 5 
                . 5 f 5 f f 5 . 
                . 4 f 4 f f . . 
                f . f . . . f . 
                `],
            200,
            characterAnimations.rule(Predicate.MovingUp, Predicate.FacingLeft)
            )
            characterAnimations.loopFrames(
            mySprite,
            [img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . 5 . 
                . 4 . 4 . . 5 . 
                . f f f . . 5 . 
                . 5 f 5 f f . . 
                . 4 f 4 f f . . 
                f . f . f . . . 
                `],
            200,
            characterAnimations.rule(Predicate.MovingDown, Predicate.FacingLeft)
            )
            characterAnimations.loopFrames(
            mySprite,
            [img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . f . . . f . f 
                `],
            200,
            characterAnimations.rule(Predicate.MovingUp, Predicate.FacingRight)
            )
            characterAnimations.loopFrames(
            mySprite,
            [img`
                . . . . . . . . 
                . . . . . . . . 
                . 5 . . . . . . 
                . 5 . . 4 . 4 . 
                . 5 . . f f f . 
                . . f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . . f . f . f 
                `],
            200,
            characterAnimations.rule(Predicate.MovingDown, Predicate.FacingRight)
            )
            characterAnimations.loopFrames(
            mySprite,
            [img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . f . . . f . f 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                `],
            200,
            characterAnimations.rule(Predicate.MovingRight)
            )
            characterAnimations.loopFrames(
            mySprite,
            [img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . 4 . 4 . . . 5 
                . f f f . . . 5 
                . 5 f 5 f f 5 . 
                . 4 f 4 f f . . 
                f . f . . . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . 4 . 4 . . . 5 
                . f f f . . . 5 
                . 5 f 5 f f 5 . 
                . 4 f 4 f f . . 
                `],
            200,
            characterAnimations.rule(Predicate.MovingLeft)
            )
            Skin = 1
        }
    }
    if (Skin == 2) {
        if (Perfects >= 9) {
            characterAnimations.loopFrames(
            mySprite,
            [img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 2 2 . 
                . 2 2 2 9 2 9 . 
                . . 2 2 2 2 2 . 
                . . 2 . 2 . 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 3 . 
                2 . . . 2 2 3 . 
                . 2 2 2 9 2 9 . 
                . . 2 2 2 2 3 . 
                . . 2 . 2 . 3 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 3 2 . 
                . 2 2 2 9 3 9 . 
                . . 2 2 2 3 2 . 
                . . 2 . 2 . 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 3 . 2 . 
                2 . . . 3 2 2 . 
                . 2 2 2 9 2 9 . 
                . . 2 2 3 2 2 . 
                . . 2 . 3 . 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 2 2 . 
                . 2 2 3 9 2 9 . 
                . . 2 3 2 2 2 . 
                . . 2 . 2 . 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 2 2 . 
                . 2 3 2 9 2 9 . 
                . . 3 2 2 2 2 . 
                . . 3 . 2 . 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 2 2 . 
                . 3 2 2 9 2 9 . 
                . . 2 2 2 2 2 . 
                . . 2 . 2 . 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                3 . . . 2 . 2 . 
                3 . . . 2 2 2 . 
                . 2 2 2 9 2 9 . 
                . . 2 2 2 2 2 . 
                . . 2 . 2 . 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 2 2 . 
                . 2 2 2 9 2 9 . 
                . . 2 2 2 2 2 . 
                . . 2 . 2 . 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 3 . 
                2 . . . 2 2 3 . 
                . 2 2 2 9 2 9 . 
                . . 2 2 2 2 3 . 
                . . 2 . 2 . 3 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 3 2 . 
                . 2 2 2 9 3 9 . 
                . . 2 2 2 3 2 . 
                . . 2 . 2 . 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 3 . 2 . 
                2 . . . 3 2 2 . 
                . 2 2 2 9 2 9 . 
                . . 2 2 3 2 2 . 
                . . 2 . 3 . 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 2 2 . 
                . 2 2 3 9 2 9 . 
                . . 2 3 2 2 2 . 
                . . 2 . 2 . 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 2 2 . 
                . 2 3 2 9 2 9 . 
                . . 3 2 2 2 2 . 
                . . 3 . 2 . 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 2 2 . 
                . 3 2 2 9 2 9 . 
                . . 2 2 2 2 2 . 
                . . 2 . 2 . 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                3 . . . 2 . 2 . 
                3 . . . 2 2 2 . 
                . 2 2 2 9 2 9 . 
                . . 2 2 2 2 2 . 
                . . 2 . 2 . 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 2 2 . 
                . 2 2 2 9 2 9 . 
                . . 2 2 2 2 2 . 
                . . 2 . 2 . 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 3 . 
                2 . . . 2 2 3 . 
                . 2 2 2 9 2 9 . 
                . . 2 2 2 2 3 . 
                . . 2 . 2 . 3 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 3 2 . 
                . 2 2 2 9 3 9 . 
                . . 2 2 2 3 2 . 
                . . 2 . 2 . 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 3 . 2 . 
                2 . . . 3 2 2 . 
                . 2 2 2 9 2 9 . 
                . . 2 2 3 2 2 . 
                . . 2 . 3 . 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 2 2 . 
                . 2 2 3 9 2 9 . 
                . . 2 3 2 2 2 . 
                . . 2 . 2 . 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 2 2 . 
                . 2 3 2 9 2 9 . 
                . . 3 2 2 2 2 . 
                . . 3 . 2 . 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 2 2 . 
                . 3 2 2 9 2 9 . 
                . . 2 2 2 2 2 . 
                . . 2 . 2 . 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                3 . . . 2 . 2 . 
                3 . . . 2 2 2 . 
                . 2 2 2 9 2 9 . 
                . . 2 2 2 2 2 . 
                . . 2 . 2 . 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 2 2 . 
                . 2 2 2 9 2 9 . 
                . . 2 2 2 2 2 . 
                . . 2 . 2 . 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 2 2 . 
                . 2 2 2 2 2 2 . 
                . . 2 2 2 2 2 . 
                . . 2 . 2 . 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 2 2 . 
                . 2 2 2 2 2 2 . 
                . . 2 2 2 2 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 2 2 . 
                . 2 2 2 2 2 2 . 
                . . 2 2 2 2 2 . 
                `,img`
                . 4 4 4 . . . . 
                . . 4 4 . . . . 
                . 4 4 . . . . . 
                . 4 4 4 . . . . 
                2 . . . 2 . 3 . 
                2 . . . 2 2 3 . 
                . 2 2 2 2 2 3 . 
                . . 2 2 2 2 3 . 
                `,img`
                . 4 4 4 . . . . 
                . . 4 4 . . . . 
                . 4 4 . . . . . 
                . 4 4 4 . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 3 2 . 
                . 2 2 2 2 3 2 . 
                . . 2 2 2 3 2 . 
                `,img`
                . 5 5 5 . . . . 
                . . 5 5 . . . . 
                . 5 5 . . . . . 
                . 5 5 5 . . . . 
                2 . . . 3 . 2 . 
                2 . . . 3 2 2 . 
                . 2 2 2 3 2 2 . 
                . . 2 2 3 2 2 . 
                `,img`
                . 4 4 4 . . . . 
                . . 4 4 . . . . 
                . 4 4 . . . . . 
                . 4 4 4 . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 2 2 . 
                . 2 2 3 2 2 2 . 
                . . 2 3 2 2 2 . 
                `,img`
                . 5 5 5 . . . . 
                . . 5 5 . . . . 
                . 5 5 . . . . . 
                . 5 5 5 . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 2 2 . 
                . 2 3 2 2 2 2 . 
                . . 3 2 2 2 2 . 
                `,img`
                . 4 4 4 . . . . 
                . . 4 4 . . . . 
                . 4 4 . . . . . 
                . 4 4 4 . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 2 2 . 
                . 3 2 2 2 2 2 . 
                . . 2 2 2 2 2 . 
                `,img`
                . 5 5 5 . . . . 
                . . 5 5 . . . . 
                . 5 5 . . . . . 
                . 5 5 5 . . . . 
                3 . . . 2 . 2 . 
                3 . . . 2 2 2 . 
                . 2 2 2 2 2 2 . 
                . . 2 2 2 2 2 . 
                `,img`
                . 4 4 4 . . . . 
                . . 4 4 . . . . 
                . 4 4 . . . . . 
                . 4 4 4 . . . . 
                2 . . . 2 . 3 . 
                2 . . . 2 2 3 . 
                . 2 2 2 2 2 3 . 
                . . 2 2 2 2 3 . 
                `,img`
                . 5 5 5 . . . . 
                . . 5 5 . . . . 
                . 5 5 . . . . . 
                . 5 5 5 . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 3 2 . 
                . 2 2 2 2 3 2 . 
                . . 2 2 2 3 2 . 
                `,img`
                . 4 4 4 . . . . 
                . . 4 4 . . . . 
                . 4 4 . . . . . 
                . 4 4 4 . . . . 
                2 . . . 3 . 2 . 
                2 . . . 3 2 2 . 
                . 2 2 2 3 2 2 . 
                . . 2 2 3 2 2 . 
                `,img`
                . 5 5 5 . . . . 
                . . 5 5 . . . . 
                . 5 5 . . . . . 
                . 5 5 5 . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 2 2 . 
                . 2 2 3 2 2 2 . 
                . . 2 3 2 2 2 . 
                `,img`
                . . 5 . . . . . 
                . . . 5 . . . . 
                . . 5 . . . . . 
                . 5 . 5 . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 2 2 . 
                . 2 3 2 2 2 2 . 
                . . 3 2 2 2 2 . 
                `,img`
                . . . . . . . . 
                . . . 5 . . . . 
                . . 5 . . . . . 
                . . . . . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 2 2 . 
                . 3 2 2 2 2 2 . 
                . . 2 2 2 2 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                3 . . . 2 . 2 . 
                3 . . . 2 2 2 . 
                . 2 2 2 9 2 9 . 
                . . 2 2 2 2 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 2 2 . 
                . 2 2 2 9 2 9 . 
                . . 2 2 2 2 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 2 2 . 
                . 2 2 2 9 2 9 . 
                . . 2 2 2 2 2 . 
                . . 2 . 2 . 2 . 
                `],
            200,
            characterAnimations.rule(Predicate.NotMoving)
            )
            characterAnimations.loopFrames(
            mySprite,
            [img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . 2 . 2 . . . 2 
                . 2 2 2 . . . 2 
                . 9 2 9 2 2 2 . 
                . 2 2 2 2 2 . . 
                2 . 2 . . . 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . 2 . 2 . . . 3 
                . 2 2 2 . . . 3 
                . 9 2 9 2 2 2 . 
                . 2 2 2 2 2 . . 
                2 . 2 . . . 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . 2 . 2 . . . 2 
                . 2 2 2 . . . 2 
                . 9 2 9 2 2 3 . 
                . 2 2 2 2 2 . . 
                2 . 2 . . . 3 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . 2 . 2 . . . 2 
                . 2 2 2 . . . 2 
                . 9 2 9 2 3 2 . 
                . 2 2 2 2 3 . . 
                2 . 2 . . . 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . 2 . 2 . . . 2 
                . 2 2 2 . . . 2 
                . 9 2 9 3 2 2 . 
                . 2 2 2 3 2 . . 
                2 . 2 . . . 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . 2 . 3 . . . 2 
                . 2 2 3 . . . 2 
                . 9 2 9 2 2 2 . 
                . 2 2 3 2 2 . . 
                2 . 2 . . . 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . 2 . 2 . . . 2 
                . 2 3 2 . . . 2 
                . 9 3 9 2 2 2 . 
                . 2 3 2 2 2 . . 
                2 . 3 . . . 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . 3 . 2 . . . 2 
                . 3 2 2 . . . 2 
                . 9 2 9 2 2 2 . 
                . 3 2 2 2 2 . . 
                2 . 2 . . . 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . 2 . 2 . . . 2 
                . 2 2 2 . . . 2 
                . 9 2 9 2 2 2 . 
                . 2 2 2 2 2 . . 
                3 . 2 . . . 2 . 
                `],
            200,
            characterAnimations.rule(Predicate.MovingUp, Predicate.FacingLeft)
            )
            characterAnimations.loopFrames(
            mySprite,
            [img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . 3 . 
                . 2 . 2 . . 3 . 
                . 2 2 2 . . 3 . 
                . 9 2 9 2 2 . . 
                . 2 2 2 2 2 . . 
                2 . 2 . 2 . . . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . 2 . 
                . 2 . 2 . . 2 . 
                . 2 2 2 . . 2 . 
                . 9 2 9 2 3 . . 
                . 2 2 2 2 3 . . 
                2 . 2 . 2 . . . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . 2 . 
                . 2 . 2 . . 2 . 
                . 2 2 2 . . 2 . 
                . 9 2 9 3 2 . . 
                . 2 2 2 3 2 . . 
                2 . 2 . 3 . . . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . 2 . 
                . 2 . 3 . . 2 . 
                . 2 2 3 . . 2 . 
                . 9 2 9 2 2 . . 
                . 2 2 3 2 2 . . 
                2 . 2 . 2 . . . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . 2 . 
                . 2 . 2 . . 2 . 
                . 2 3 2 . . 2 . 
                . 9 3 9 2 2 . . 
                . 2 3 2 2 2 . . 
                2 . 3 . 2 . . . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . 2 . 
                . 3 . 2 . . 2 . 
                . 3 2 2 . . 2 . 
                . 9 2 9 2 2 . . 
                . 3 2 2 2 2 . . 
                2 . 2 . 2 . . . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . 2 . 
                . 2 . 2 . . 2 . 
                . 2 2 2 . . 2 . 
                . 9 2 9 2 2 . . 
                . 2 2 2 2 2 . . 
                3 . 2 . 2 . . . 
                `],
            200,
            characterAnimations.rule(Predicate.MovingDown, Predicate.FacingLeft)
            )
            characterAnimations.loopFrames(
            mySprite,
            [img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 2 2 . 
                . 2 2 2 9 2 9 . 
                . . 2 2 2 2 2 . 
                . 2 . . . 2 . 2 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                3 . . . 2 . 2 . 
                3 . . . 2 2 2 . 
                . 2 2 2 9 2 9 . 
                . . 2 2 2 2 2 . 
                . 2 . . . 2 . 2 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 2 2 . 
                . 3 2 2 9 2 9 . 
                . . 2 2 2 2 2 . 
                . 3 . . . 2 . 2 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 2 2 . 
                . 2 3 2 9 2 9 . 
                . . 3 2 2 2 2 . 
                . 2 . . . 2 . 2 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 2 2 . 
                . 2 2 3 9 2 9 . 
                . . 2 3 2 2 2 . 
                . 2 . . . 2 . 2 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 3 . 2 . 
                2 . . . 3 2 2 . 
                . 2 2 2 9 2 9 . 
                . . 2 2 3 2 2 . 
                . 2 . . . 2 . 2 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 3 2 . 
                . 2 2 2 9 3 9 . 
                . . 2 2 2 3 2 . 
                . 2 . . . 3 . 2 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 3 . 
                2 . . . 2 2 3 . 
                . 2 2 2 9 2 9 . 
                . . 2 2 2 2 3 . 
                . 2 . . . 2 . 2 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 2 2 . 
                . 2 2 2 9 2 9 . 
                . . 2 2 2 2 2 . 
                . 2 . . . 2 . 3 
                `],
            200,
            characterAnimations.rule(Predicate.MovingUp, Predicate.FacingRight)
            )
            characterAnimations.loopFrames(
            mySprite,
            [img`
                . . . . . . . . 
                . . . . . . . . 
                . 3 . . . . . . 
                . 3 . . 2 . 2 . 
                . 3 . . 2 2 2 . 
                . . 2 2 9 2 9 . 
                . . 2 2 2 2 2 . 
                . . . 2 . 2 . 2 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . 2 . . . . . . 
                . 2 . . 2 . 2 . 
                . 2 . . 2 2 2 . 
                . . 3 2 9 2 9 . 
                . . 3 2 2 2 2 . 
                . . . 2 . 2 . 2 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . 2 . . . . . . 
                . 2 . . 2 . 2 . 
                . 2 . . 2 2 2 . 
                . . 2 3 9 2 9 . 
                . . 2 3 2 2 2 . 
                . . . 3 . 2 . 2 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . 2 . . . . . . 
                . 2 . . 3 . 2 . 
                . 2 . . 3 2 2 . 
                . . 2 2 9 2 9 . 
                . . 2 2 3 2 2 . 
                . . . 2 . 2 . 2 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . 2 . . . . . . 
                . 2 . . 2 . 2 . 
                . 2 . . 2 3 2 . 
                . . 2 2 9 3 9 . 
                . . 2 2 2 3 2 . 
                . . . 2 . 3 . 2 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . 2 . . . . . . 
                . 2 . . 2 . 3 . 
                . 2 . . 2 2 3 . 
                . . 2 2 9 2 9 . 
                . . 2 2 2 2 3 . 
                . . . 2 . 2 . 2 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . 2 . . . . . . 
                . 2 . . 2 . 2 . 
                . 2 . . 2 2 2 . 
                . . 2 2 9 2 9 . 
                . . 2 2 2 2 2 . 
                . . . 2 . 2 . 3 
                `],
            200,
            characterAnimations.rule(Predicate.MovingDown, Predicate.FacingRight)
            )
            characterAnimations.loopFrames(
            mySprite,
            [img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                3 . . . 3 . 2 . 
                3 . . . 3 3 2 . 
                . 3 2 2 9 3 9 . 
                . . 2 2 3 3 2 . 
                . 3 . . . 3 . 2 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 3 . 
                2 . . . 2 2 3 . 
                . 2 3 3 9 2 9 . 
                . . 3 3 2 2 3 . 
                `],
            200,
            characterAnimations.rule(Predicate.MovingRight)
            )
            characterAnimations.loopFrames(
            mySprite,
            [img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . 2 . 3 . . . 3 
                . 2 3 3 . . . 3 
                . 9 3 9 2 2 3 . 
                . 2 3 3 2 2 . . 
                2 . 3 . . . 3 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . 3 . 2 . . . 2 
                . 3 2 2 . . . 2 
                . 9 2 9 3 3 2 . 
                . 3 2 2 3 3 . . 
                `],
            200,
            characterAnimations.rule(Predicate.MovingLeft)
            )
            Skin = 2
        }
    }
    if (Skin == 3) {
        if (Perfects >= 15) {
            characterAnimations.loopFrames(
            mySprite,
            [img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                4 . . . 6 . 6 . 
                7 . . . f 7 f . 
                . 7 f f 4 7 4 . 
                . . f 6 7 7 7 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                4 . . . 6 . 6 . 
                7 . . . f 7 f . 
                . 7 f f 4 7 4 . 
                . . f 6 7 7 7 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                4 . . . 6 . 6 . 
                7 . . . f 7 f . 
                . 7 f f 4 7 4 . 
                . . f 6 7 7 7 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                4 . . . 6 . 6 . 
                7 . . . f 7 f . 
                . 7 f f 4 7 4 . 
                . . f 6 7 7 7 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                4 . . . 6 . 6 . 
                7 . . . f 7 f . 
                . 7 f f 4 7 4 . 
                . . f 6 7 7 7 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                4 . . . 6 . 6 . 
                7 . . . f 7 f . 
                . 7 f f 4 7 4 . 
                . . f 6 7 7 7 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                4 . . . 6 . 6 . 
                7 . . . f 7 f . 
                . 7 f f 4 7 4 . 
                . . f 6 7 7 7 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                4 . . . 6 . 6 . 
                7 . . . f 7 f . 
                . 7 f f 4 7 4 . 
                . . f 6 7 7 7 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                4 . . . 6 . 6 . 
                7 . . . f 7 f . 
                . 7 f f 4 7 4 . 
                . . f 6 7 7 7 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                4 . . . 6 . 6 . 
                7 . . . f 7 f . 
                . 7 f f 4 7 4 . 
                . . f 6 7 7 7 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . 6 . 6 . 
                4 . . . f 7 f . 
                7 . . . 4 7 4 . 
                . 7 f f 7 7 7 . 
                . . f 6 f 6 f . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . 6 . 6 . 
                4 . . . f 7 f . 
                7 . . . 4 7 4 . 
                . 7 f f 7 7 7 . 
                . . f 6 f 6 f . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . 6 . 6 . 
                4 . . . f 7 f . 
                7 . . . f 7 f . 
                . 7 f f 7 7 7 . 
                . . f 6 f 6 f . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . 6 . 6 . 
                4 . . . f 7 f . 
                7 . . . 4 7 4 . 
                . 7 f f 7 7 7 . 
                . . f 6 f 6 f . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . 6 . 6 . 
                4 . . . f 7 f . 
                7 . . . 4 7 4 . 
                . 7 f f 7 7 7 . 
                . . f 6 f 6 f . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . 6 . 6 . 
                4 . . . f 7 f . 
                7 . . . 4 7 4 . 
                . 7 f f 7 7 7 . 
                . . f 6 f 6 f . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . 6 . 6 . 
                4 . . . f 7 f . 
                7 . . . 4 7 4 . 
                . 7 f f 7 7 7 . 
                . . f 6 f 6 f . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . 6 . 6 . 
                4 . . . f 7 f . 
                7 . . . 4 7 4 . 
                . 7 f f 7 7 7 . 
                . . f 6 f 6 f . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                4 . . . 6 . 6 . 
                7 . . . f 7 f . 
                . 7 f f 4 7 4 . 
                . . f 6 7 7 7 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                4 . . . 6 . 6 . 
                7 . . . f 7 f . 
                . 7 f f 4 7 4 . 
                . . f 6 7 7 7 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                4 . . . 6 . 6 . 
                7 . . . f 7 f . 
                . 7 f f 4 7 4 . 
                . . f 6 7 7 7 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                4 . . . 6 . 6 . 
                7 . . . f 7 f . 
                . 7 f f 4 7 4 . 
                . . f 6 7 7 7 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                4 . . . 6 . 6 . 
                7 . . . f 7 f . 
                . 7 f f 4 7 4 . 
                . . f 6 7 7 7 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                4 . . . 6 . 6 . 
                7 . . . f 7 f . 
                . 7 f f 4 7 4 . 
                . . f 6 7 7 7 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                4 . . . 6 . 6 . 
                7 . . . f 7 f . 
                . 7 f f 4 7 4 . 
                . . f 6 7 7 7 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                4 . . . 6 . 6 . 
                7 . . . f 7 f . 
                . 7 f f 4 7 4 . 
                . . f 6 7 7 7 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                4 . . . 6 . 6 . 
                7 . . . f 7 f . 
                . 7 f f 4 7 4 . 
                . . f 6 7 7 7 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                4 . . . 6 . 6 . 
                7 . . . f 7 f . 
                . 7 f f 4 7 4 . 
                . . f 6 7 7 7 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                4 . . . 6 . 6 . 
                7 . . . f 7 f . 
                . 7 f f 4 7 4 . 
                . . f 6 7 7 7 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                4 . . . 6 . 6 . 
                7 . . . f 7 f . 
                . 7 f f 4 7 4 . 
                . . f 6 7 7 7 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . 6 . 6 . 
                4 . . . f 7 f . 
                7 . . f 4 7 4 . 
                . 7 f 6 7 7 7 . 
                . . f . f . f . 
                . . f . . . . . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                4 . . . 6 . 6 . 
                7 . . . f 7 f . 
                . 7 f f 4 7 4 . 
                . . f 6 7 7 7 . 
                . . 5 . 5 . 5 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                4 . . . 6 . 6 . 
                7 . . . f 7 f . 
                . 7 f f 4 7 4 . 
                . . 5 5 5 5 5 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                4 . . . 6 . 6 . 
                7 . . . f 7 f . 
                . 5 5 5 5 5 5 . 
                . . f f f f f . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                4 . . . 6 . 6 . 
                5 . . . 5 5 5 . 
                . f f f 1 f 1 . 
                . . f f f f f . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 5 . 5 . 
                f . . . f f f . 
                . f f f 1 f 1 . 
                . . f f f f f . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                f . . . f . f . 
                f . . . f f f . 
                . f f f 1 f 1 . 
                . . f f f f f . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                f . . . f . f . 
                f . . . f f f . 
                . f f f 1 f 1 . 
                . . f f f f f . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                f . . . f . f . 
                f . . . f f f . 
                . f f f 1 f 1 . 
                . . f f f f f . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                f . . . f . f . 
                f . . . f f f . 
                . f f f 1 f f . 
                . . f f f f f . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                f . . . f . f . 
                f . . . f f f . 
                . f f f 1 f 1 . 
                . . f f f f f . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                f . . . f . f . 
                f . . . f f f . 
                . f f f 1 f 1 . 
                . . f f f f f . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                f . . . f . f . 
                f . . . f f f . 
                . f f f 1 f 1 . 
                . . f f f f f . 
                . . 5 . 5 . 5 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                f . . . f . f . 
                f . . . f f f . 
                . f f f 1 f 1 . 
                . . 5 5 5 5 5 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                f . . . f . f . 
                f . . . f f f . 
                . 5 5 5 5 5 5 . 
                . . f 6 7 7 7 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                f . . . f . f . 
                5 . . . 5 5 5 . 
                . 7 f f 4 7 4 . 
                . . f 6 7 7 7 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 5 . 5 . 
                7 . . . f 7 f . 
                . 7 f f 4 7 4 . 
                . . f 6 7 7 7 . 
                . . f . f . f . 
                `],
            200,
            characterAnimations.rule(Predicate.NotMoving)
            )
            characterAnimations.loopFrames(
            mySprite,
            [img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . 6 . 6 . . . 4 
                . f 7 f . . . 7 
                . 4 7 4 f f 7 . 
                . 7 7 7 6 f . . 
                f . f . . . f . 
                `],
            200,
            characterAnimations.rule(Predicate.MovingUp, Predicate.FacingLeft)
            )
            characterAnimations.loopFrames(
            mySprite,
            [img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . 4 . 
                . 6 . 6 . . 7 . 
                . f 7 f . . 7 . 
                . 4 7 4 f f . . 
                . 7 7 7 6 f . . 
                f . f . f . . . 
                `],
            200,
            characterAnimations.rule(Predicate.MovingDown, Predicate.FacingLeft)
            )
            characterAnimations.loopFrames(
            mySprite,
            [img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                f . . . 6 . 6 . 
                7 . . . f 7 f . 
                . 7 f f 4 7 4 . 
                . . f 6 7 7 7 . 
                . f . . . f . f 
                `],
            200,
            characterAnimations.rule(Predicate.MovingUp, Predicate.FacingRight)
            )
            characterAnimations.loopFrames(
            mySprite,
            [img`
                . . . . . . . . 
                . . . . . . . . 
                . 4 . . . . . . 
                . 7 . . 6 . 6 . 
                . 7 . . f 7 f . 
                . . f f 4 7 4 . 
                . . f 6 7 7 7 . 
                . . . f . f . f 
                `],
            200,
            characterAnimations.rule(Predicate.MovingDown, Predicate.FacingRight)
            )
            characterAnimations.loopFrames(
            mySprite,
            [img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                4 . . . 6 . 6 . 
                7 . . . f 7 f . 
                . 7 f f 4 7 4 . 
                . . f 6 7 7 7 . 
                . f . . . f . f 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                4 . . . 6 . 6 . 
                7 . . . f 7 f . 
                . 7 f f 4 7 4 . 
                . . f 6 7 7 7 . 
                `],
            200,
            characterAnimations.rule(Predicate.MovingRight)
            )
            characterAnimations.loopFrames(
            mySprite,
            [img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . 6 . 6 . . . 4 
                . f 7 f . . . 7 
                . 4 7 4 f f 7 . 
                . 7 7 7 6 f . . 
                f . f . . . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . 6 . 6 . . . 4 
                . f 7 f . . . 7 
                . 4 7 4 f f 7 . 
                . 7 7 7 6 f . . 
                `],
            200,
            characterAnimations.rule(Predicate.MovingLeft)
            )
            Skin = 3
        }
    }
    if (Skin == 4) {
        if (Perfects >= 23) {
            characterAnimations.loopFrames(
            mySprite,
            [img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                3 . . . 7 . 3 . 
                3 . . . 7 5 3 . 
                . 7 5 3 1 5 1 . 
                . . 5 3 7 5 3 . 
                . . 5 . 7 . 3 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                7 . . . 5 . 7 . 
                7 . . . 5 3 7 . 
                . 5 3 7 1 3 1 . 
                . . 3 7 5 3 7 . 
                . . 3 . 5 . 7 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 3 . 5 . 
                5 . . . 3 7 5 . 
                . 3 7 5 1 7 1 . 
                . . 7 5 3 7 5 . 
                . . 7 . 3 . 5 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                3 . . . 7 . 3 . 
                3 . . . 7 5 3 . 
                . 7 5 3 1 5 1 . 
                . . 5 3 7 5 3 . 
                . . 5 . 7 . 3 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                7 . . . 5 . 7 . 
                7 . . . 5 3 7 . 
                . 5 3 7 1 3 1 . 
                . . 3 7 5 3 7 . 
                . . 3 . 5 . 7 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 3 . 5 . 
                5 . . . 3 7 5 . 
                . 3 7 5 1 7 1 . 
                . . 7 5 3 7 5 . 
                . . 7 . 3 . 5 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                3 . . . 7 . 3 . 
                3 . . . 7 5 3 . 
                . 7 5 3 1 5 1 . 
                . . 5 3 7 5 3 . 
                . . 5 . 7 . 3 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                7 . . . 5 . 7 . 
                7 . . . 5 3 7 . 
                . 5 3 7 5 3 7 . 
                . . 3 7 5 3 7 . 
                . . 3 . 5 . 7 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 3 . 5 . 
                5 . . . 3 7 5 . 
                . 3 7 5 1 7 1 . 
                . . 7 5 3 7 5 . 
                . . 7 . 3 . 5 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                3 . . . 7 . 3 . 
                3 . . . 7 5 3 . 
                . 7 5 3 1 5 1 . 
                . . 5 3 7 5 3 . 
                . . 5 . 7 . 3 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                7 . . . 5 . 7 . 
                7 . . . 5 3 7 . 
                . 5 3 7 1 3 1 . 
                . . 3 7 5 3 7 . 
                . . 3 . 5 . 7 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 3 . 5 . 
                5 . . . 3 7 5 . 
                . 3 7 5 1 7 1 . 
                . . 7 5 3 7 5 . 
                . . 7 . 3 . 5 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                3 . . . 7 . 3 . 
                3 . . . 7 5 3 . 
                . 7 5 3 1 5 1 . 
                . . 5 3 7 5 3 . 
                . . 5 . 7 . 3 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                7 . . . 5 . 7 . 
                7 . . . 5 3 7 . 
                . 5 3 7 1 3 1 . 
                . . 3 7 5 3 7 . 
                . . 3 . 5 . 7 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 3 . 5 . 
                5 . . . 3 7 5 . 
                . 3 7 5 1 7 1 . 
                . . 7 5 3 7 5 . 
                . . 7 . 3 . 5 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                3 . . . 7 . 3 . 
                3 . . . 7 5 3 . 
                . 7 5 3 1 5 1 . 
                . . 5 3 7 5 3 . 
                . . 5 . 7 . 3 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                7 . . . 5 . 7 . 
                7 . . . 5 3 7 . 
                . 5 3 7 1 3 1 . 
                . . 3 7 5 3 7 . 
                . . 3 . 5 . 7 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 3 . 5 . 
                5 . . . 3 7 5 . 
                . 3 7 5 1 7 1 . 
                . . 7 5 3 7 5 . 
                . . 7 . 3 . 5 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                3 . . . 7 . 3 . 
                3 . . . 7 5 3 . 
                . 7 5 3 1 5 1 . 
                . . 5 3 7 5 3 . 
                . . 5 . 7 . 3 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                7 . . . 5 . 7 . 
                7 . . . 5 3 7 . 
                . 5 3 7 1 3 1 . 
                . . 3 7 5 3 7 . 
                . . 3 . 5 . 7 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 3 . 5 . 
                5 . . . 3 7 5 . 
                . 3 7 5 1 7 1 . 
                . . 7 5 3 7 5 . 
                . . 7 . 3 . 5 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                3 . . . 7 . 3 . 
                3 . . . 7 5 3 . 
                . 7 5 3 1 5 1 . 
                . . 5 3 7 5 3 . 
                . . 5 . 7 . 3 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                7 . . . 5 . 7 . 
                7 . . . 5 3 7 . 
                . 5 3 7 1 3 1 . 
                . . 3 7 5 3 7 . 
                . . 3 . 5 . 7 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 3 . 5 . 
                5 . . . 3 7 5 . 
                . 3 7 5 1 7 1 . 
                . . 7 5 3 7 5 . 
                . . 7 . 3 . 5 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                3 . . . 7 . 3 . 
                3 . . . 7 5 3 . 
                . 7 5 3 1 5 1 . 
                . . 5 3 7 5 3 . 
                . . 5 . 7 . 3 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                b . . . e . b . 
                b . . . e d b . 
                . e d b 1 d 1 . 
                . . d b e d b . 
                . . d . e . b . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                b . . . e . b . 
                b . . . e d b . 
                . e d b 1 d 1 . 
                . . d b e d b . 
                . . d . e . b . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                b . . . e . b . 
                b . . . e d b . 
                . e d b 1 d 1 . 
                . . d b e d b . 
                . . d . e . b . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                b . . . e . b . 
                b . . . e d b . 
                . e d b 1 d 1 . 
                . . d b e d b . 
                . . d . e . b . 
                `,img`
                . 5 5 5 . . . . 
                . . . 5 . . . . 
                . . 5 5 . . . . 
                b . . . e . b . 
                b . 5 . e d b . 
                . e d b 1 d 1 . 
                . . d b e d b . 
                . . d . e . b . 
                `,img`
                . 4 4 4 . . . . 
                . . . 4 . . . . 
                . . 4 4 . . . . 
                b . . . e . b . 
                b . 4 . e d b . 
                . e d b 1 d 1 . 
                . . d b e d b . 
                . . d . e . b . 
                `,img`
                . 5 5 5 . . . . 
                . . . 5 . . . . 
                . . 5 5 . . . . 
                b . . . e . b . 
                b . 5 . e d b . 
                . e d b 1 d 1 . 
                . . d b e d b . 
                . . d . e . b . 
                `,img`
                . 4 4 4 . . . . 
                . . . 4 . . . . 
                . . 4 4 . . . . 
                b . . . e . b . 
                b . 4 . e d b . 
                . e d b 1 d 1 . 
                . . d b e d b . 
                . . d . e . b . 
                `,img`
                . 5 5 5 . . . . 
                . . . 5 . . . . 
                . . 5 5 . . . . 
                b . . . e . b . 
                b . 5 . e d b . 
                . e d b 1 d 1 . 
                . . d b e d b . 
                . . d . e . b . 
                `,img`
                . 4 4 4 . . . . 
                . . . 4 . . . . 
                . . 4 4 . . . . 
                b . . . e . b . 
                b . 4 . e d b . 
                . e d b 1 d 1 . 
                . . d b e d b . 
                . . d . e . b . 
                `,img`
                . 5 5 5 . . . . 
                . . . 5 . . . . 
                . . 5 5 . . . . 
                b . . . e . b . 
                b . 5 . e d b . 
                . e d b 1 d 1 . 
                . . d b e d b . 
                . . d . e . b . 
                `,img`
                . 4 4 4 . . . . 
                . . . 4 . . . . 
                . . 4 4 . . . . 
                b . . . e . b . 
                b . 4 . e d b . 
                . e d b 1 d 1 . 
                . . d b e d b . 
                . . d . e . b . 
                `,img`
                . 5 5 5 . . . . 
                . . . 5 . . . . 
                . . 5 5 . . . . 
                b . . . e . b . 
                b . 5 . e d b . 
                . e d b 1 d 1 . 
                . . d b e d b . 
                . . d . e . b . 
                `,img`
                . 5 . . . . . . 
                . . . 5 . . . . 
                . . 5 . . . . . 
                b . . . e . b . 
                b . 5 . e d b . 
                . e d b 1 d 1 . 
                . . d b e d b . 
                . . d . e . b . 
                `,img`
                . . . . . . . . 
                . . . 5 . . . . 
                . . 5 . . . . . 
                b . . . e . b . 
                b . . . e d b . 
                . e d b 1 d 1 . 
                . . d b e d b . 
                . . d . e . b . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                b . . . e . b . 
                b . . . e d b . 
                . e d b 1 d 1 . 
                . . d b e d b . 
                . . d . e . b . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                3 . . . 7 . 3 . 
                3 . . . 7 5 3 . 
                . 7 5 3 1 5 1 . 
                . . 5 3 7 5 3 . 
                . . 5 . 7 . 3 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                7 . . . 5 . 7 . 
                7 . . . 5 3 7 . 
                . 5 3 7 1 3 1 . 
                . . 3 7 5 3 7 . 
                . . 3 . 5 . 7 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 3 . 5 . 
                5 . . . 3 7 5 . 
                . 3 7 5 1 7 1 . 
                . . 7 5 3 7 5 . 
                . . 7 . 3 . 5 . 
                `],
            200,
            characterAnimations.rule(Predicate.NotMoving)
            )
            characterAnimations.loopFrames(
            mySprite,
            [img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . 7 . 3 . . . 7 
                . 7 5 3 . . . 7 
                . 9 5 9 7 5 3 . 
                . 7 5 3 7 5 . . 
                3 . 5 . . . 3 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . 5 . 7 . . . 5 
                . 5 3 7 . . . 5 
                . 9 3 9 5 3 7 . 
                . 5 3 7 5 3 . . 
                7 . 3 . . . 7 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . 3 . 5 . . . 3 
                . 3 7 5 . . . 3 
                . 9 7 9 3 7 5 . 
                . 3 7 5 3 7 . . 
                5 . 7 . . . 5 . 
                `],
            200,
            characterAnimations.rule(Predicate.MovingUp, Predicate.FacingLeft)
            )
            characterAnimations.loopFrames(
            mySprite,
            [img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . 3 . 
                . 7 . 3 . . 3 . 
                . 7 5 3 . . 3 . 
                . 9 5 9 7 5 . . 
                . 7 5 3 7 5 . . 
                3 . 5 . 7 . . . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . 7 . 
                . 5 . 7 . . 7 . 
                . 5 3 7 . . 7 . 
                . 9 3 9 5 3 . . 
                . 5 3 7 5 3 . . 
                7 . 3 . 5 . . . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . 5 . 
                . 3 . 5 . . 5 . 
                . 3 7 5 . . 5 . 
                . 9 7 9 3 7 . . 
                . 3 7 5 3 7 . . 
                5 . 7 . 3 . . . 
                `],
            200,
            characterAnimations.rule(Predicate.MovingDown, Predicate.FacingLeft)
            )
            characterAnimations.loopFrames(
            mySprite,
            [img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                7 . . . 3 . 7 . 
                7 . . . 3 5 7 . 
                . 3 5 7 9 5 9 . 
                . . 5 7 3 5 7 . 
                . 3 . . . 5 . 3 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 7 . 5 . 
                5 . . . 7 3 5 . 
                . 7 3 5 9 3 9 . 
                . . 3 5 7 3 5 . 
                . 7 . . . 3 . 7 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                3 . . . 5 . 3 . 
                3 . . . 5 7 3 . 
                . 5 7 3 9 7 9 . 
                . . 7 3 5 7 3 . 
                . 5 . . . 7 . 5 
                `],
            200,
            characterAnimations.rule(Predicate.MovingUp, Predicate.FacingRight)
            )
            characterAnimations.loopFrames(
            mySprite,
            [img`
                . . . . . . . . 
                . . . . . . . . 
                . 3 . . . . . . 
                . 3 . . 3 . 7 . 
                . 3 . . 3 5 7 . 
                . . 5 7 9 5 9 . 
                . . 5 7 3 5 7 . 
                . . . 7 . 5 . 3 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . 7 . . . . . . 
                . 7 . . 7 . 5 . 
                . 7 . . 7 3 5 . 
                . . 3 5 9 3 9 . 
                . . 3 5 7 3 5 . 
                . . . 5 . 3 . 7 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . 5 . . . . . . 
                . 5 . . 5 . 3 . 
                . 5 . . 5 7 3 . 
                . . 7 3 9 7 9 . 
                . . 7 3 5 7 3 . 
                . . . 3 . 7 . 5 
                `],
            200,
            characterAnimations.rule(Predicate.MovingDown, Predicate.FacingRight)
            )
            characterAnimations.loopFrames(
            mySprite,
            [img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                7 . . . 3 . 7 . 
                7 . . . 3 5 7 . 
                . 3 5 7 1 5 1 . 
                . . 5 7 3 5 7 . 
                . 3 . . . 5 . 3 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                3 . . . 5 . 3 . 
                3 . . . 5 7 3 . 
                . 5 7 3 1 7 1 . 
                . . 7 3 5 7 3 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 7 . 5 . 
                5 . . . 7 3 5 . 
                . 7 3 5 1 3 1 . 
                . . 3 5 7 3 5 . 
                . 7 . . . 3 . 7 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                7 . . . 3 . 7 . 
                7 . . . 3 5 7 . 
                . 3 5 7 1 5 1 . 
                . . 5 7 3 5 7 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                3 . . . 5 . 3 . 
                3 . . . 5 7 3 . 
                . 5 7 3 1 7 1 . 
                . . 7 3 5 7 3 . 
                . 5 . . . 7 . 5 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 7 . 5 . 
                5 . . . 7 3 5 . 
                . 7 3 5 1 3 1 . 
                . . 3 5 7 3 5 . 
                `],
            200,
            characterAnimations.rule(Predicate.MovingRight)
            )
            characterAnimations.loopFrames(
            mySprite,
            [img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . 7 . 3 . . . 7 
                . 7 5 3 . . . 7 
                . 1 5 1 7 5 3 . 
                . 7 5 3 7 5 . . 
                3 . 5 . . . 3 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . 3 . 5 . . . 3 
                . 3 7 5 . . . 3 
                . 1 7 1 3 7 5 . 
                . 3 7 5 3 7 . . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . 5 . 7 . . . 5 
                . 5 3 7 . . . 5 
                . 1 3 1 5 3 7 . 
                . 5 3 7 5 3 . . 
                7 . 3 . . . 7 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . 7 . 3 . . . 7 
                . 7 5 3 . . . 7 
                . 1 5 1 7 5 3 . 
                . 7 5 3 7 5 . . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . 3 . 5 . . . 3 
                . 3 7 5 . . . 3 
                . 1 7 1 3 7 5 . 
                . 3 7 5 3 7 . . 
                5 . 7 . . . 5 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . 5 . 7 . . . 5 
                . 5 3 7 . . . 5 
                . 1 3 1 5 3 7 . 
                . 5 3 7 5 3 . . 
                `],
            200,
            characterAnimations.rule(Predicate.MovingLeft)
            )
            Skin = 4
        }
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile44`, function (sprite, location) {
    if (controller.A.isPressed()) {
        timer.after(1, function () {
            tiles.setTileAt(location, assets.tile`transparency8`)
            extraEffects.createSpreadEffectOnAnchor(mySprite, extraEffects.createSingleColorSpreadEffectData(9, ExtraEffectPresetShape.Spark), 5000, 100)
            sprites.destroyAllSpritesOfKind(SpriteKind.Spike)
            sprites.destroyAllSpritesOfKind(SpriteKind.Setup)
            sprites.destroyAllSpritesOfKind(SpriteKind.Nothing)
            sprites.destroyAllSpritesOfKind(SpriteKind.Text)
            sprites.destroyAllSpritesOfKind(SpriteKind.Saw)
            sprites.destroyAllSpritesOfKind(SpriteKind.Spout)
            sprites.destroyAllSpritesOfKind(SpriteKind.Scorchup)
            sprites.destroyAllSpritesOfKind(SpriteKind.Cacti)
            sprites.destroyAllSpritesOfKind(SpriteKind.Blurt)
            sprites.destroyAllSpritesOfKind(SpriteKind.Hover)
            sprites.destroyAllSpritesOfKind(SpriteKind.BuzzSaw)
            GameStart = 0
            sprites.destroyAllSpritesOfKind(SpriteKind.Player)
            music.stopAllSounds()
            music.play(music.createSong(hex`005a000408020103001c0001dc00690000045e010004000000000000000000000564000104000308000000200003191d20`), music.PlaybackMode.InBackground)
            scene.cameraShake(4, 500)
            color.startFadeFromCurrent(color.White, 1000)
            pause(5000)
            LevelsDone += 1
            if (PlayingLevel == 1) {
                if (Level1Done == 0) {
                    Level1Done = 1
                } else {
                    LevelsDone += -1
                }
                if (info.life() == 3) {
                    Level1Done = 2
                }
            }
            if (PlayingLevel == 2) {
                if (Level2Done == 0) {
                    Level2Done = 1
                } else {
                    LevelsDone += -1
                }
                if (info.life() == 3) {
                    Level2Done = 2
                }
            }
            if (PlayingLevel == 3) {
                if (Level3Done == 0) {
                    Level3Done = 1
                } else {
                    LevelsDone += -1
                }
                if (info.life() == 3) {
                    Level3Done = 2
                }
            }
            if (PlayingLevel == 4) {
                if (Level4Done == 0) {
                    Level4Done = 1
                } else {
                    LevelsDone += -1
                }
                if (info.life() == 3) {
                    Level4Done = 2
                }
            }
            if (PlayingLevel == 6) {
                if (Level6Done == 0) {
                    Level6Done = 1
                } else {
                    LevelsDone += -1
                }
                if (info.life() == 3) {
                    Level6Done = 2
                }
            }
            if (PlayingLevel == 7) {
                if (Level7Done == 0) {
                    Level7Done = 1
                } else {
                    LevelsDone += -1
                }
                if (info.life() == 3) {
                    Level7Done = 2
                }
            }
            if (PlayingLevel == 8) {
                if (Level8Done == 0) {
                    Level8Done = 1
                } else {
                    LevelsDone += -1
                }
                if (info.life() == 3) {
                    Level8Done = 2
                }
            }
            if (PlayingLevel == 14) {
                if (Level14Done == 0) {
                    Level14Done = 1
                } else {
                    LevelsDone += -1
                }
                if (info.life() == 3) {
                    Level14Done = 2
                }
            }
            if (PlayingLevel == 13) {
                if (Level13Done == 0) {
                    Level13Done = 1
                } else {
                    LevelsDone += -1
                }
                if (info.life() == 3) {
                    Level13Done = 2
                }
            }
            if (PlayingLevel == 12) {
                if (Level12Done == 0) {
                    Level12Done = 1
                } else {
                    LevelsDone += -1
                }
                if (info.life() == 3) {
                    Level12Done = 2
                }
            }
            if (PlayingLevel == 11) {
                if (Level11Done == 0) {
                    Level11Done = 1
                } else {
                    LevelsDone += -1
                }
                if (info.life() == 3) {
                    Level11Done = 2
                }
            }
            if (PlayingLevel == 9) {
                if (Level9Done == 0) {
                    Level9Done = 1
                } else {
                    LevelsDone += -1
                }
                if (info.life() == 3) {
                    Level9Done = 2
                }
            }
            Menu()
            PlayingLevel = 0
        })
    } else {
        mySprite.sayText("A", 50, false)
    }
})
function Skin2 () {
    if (Skin == 0) {
        characterAnimations.loopFrames(
        mySprite,
        [img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f 1 f 1 . 
            . . f f f f f . 
            . . f . f . f . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f 1 f 1 . 
            . . f f f f f . 
            . . f . f . f . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f 1 f 1 . 
            . . f f f f f . 
            . . f . f . f . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f 1 f 1 . 
            . . f f f f f . 
            . . f . f . f . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f 1 f 1 . 
            . . f f f f f . 
            . . f . f . f . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f 1 f 1 . 
            . . f f f f f . 
            . . f . f . f . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f 1 f 1 . 
            . . f f f f f . 
            . . f . f . f . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f 1 f 1 . 
            . . f f f f f . 
            . . f . f . f . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f 1 f 1 . 
            . . f f f f f . 
            . . f . f . f . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f 1 f 1 . 
            . . f f f f f . 
            . . f . f . f . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f f f f . 
            . . f f f f f . 
            . . f . f . f . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f 1 f 1 . 
            . . f f f f f . 
            . . f . f . f . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f 1 f 1 . 
            . . f f f f f . 
            . . f . f . f . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f 1 f 1 . 
            . . f f f f f . 
            . . f . f . f . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f 1 f 1 . 
            . . f f f f f . 
            . . f . f . f . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f 1 f 1 . 
            . . f f f f f . 
            . . f . f . f . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f 1 f 1 . 
            . . f f f f f . 
            . . f . f . f . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f 1 f 1 . 
            . . f f f f f . 
            . . f . f . f . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f 1 f 1 . 
            . . f f f f f . 
            . . f . f . f . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f 1 f 1 . 
            . . f f f f f . 
            . . f . f . f . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f 1 f 1 . 
            . . f f f f f . 
            . . f . f . f . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f 1 f 1 . 
            . . f f f f f . 
            . . f . f . f . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f 1 f 1 . 
            . . f f f f f . 
            . . f . f . f . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f 1 f 1 . 
            . . f f f f f . 
            . . f . f . f . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f 1 f 1 . 
            . . f f f f f . 
            . . f . f . f . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f f f f . 
            . . f f f f f . 
            . . f . f . f . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f f f f . 
            . . f f f f f . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f f f f . 
            . . f f f f f . 
            `,img`
            . 4 4 4 . . . . 
            . . 4 4 . . . . 
            . 4 4 . . . . . 
            . 4 4 4 . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f f f f . 
            . . f f f f f . 
            `,img`
            . 4 4 4 . . . . 
            . . 4 4 . . . . 
            . 4 4 . . . . . 
            . 4 4 4 . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f f f f . 
            . . f f f f f . 
            `,img`
            . 5 5 5 . . . . 
            . . 5 5 . . . . 
            . 5 5 . . . . . 
            . 5 5 5 . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f f f f . 
            . . f f f f f . 
            `,img`
            . 4 4 4 . . . . 
            . . 4 4 . . . . 
            . 4 4 . . . . . 
            . 4 4 4 . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f f f f . 
            . . f f f f f . 
            `,img`
            . 5 5 5 . . . . 
            . . 5 5 . . . . 
            . 5 5 . . . . . 
            . 5 5 5 . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f f f f . 
            . . f f f f f . 
            `,img`
            . 4 4 4 . . . . 
            . . 4 4 . . . . 
            . 4 4 . . . . . 
            . 4 4 4 . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f f f f . 
            . . f f f f f . 
            `,img`
            . 5 5 5 . . . . 
            . . 5 5 . . . . 
            . 5 5 . . . . . 
            . 5 5 5 . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f f f f . 
            . . f f f f f . 
            `,img`
            . 4 4 4 . . . . 
            . . 4 4 . . . . 
            . 4 4 . . . . . 
            . 4 4 4 . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f f f f . 
            . . f f f f f . 
            `,img`
            . 5 5 5 . . . . 
            . . 5 5 . . . . 
            . 5 5 . . . . . 
            . 5 5 5 . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f f f f . 
            . . f f f f f . 
            `,img`
            . 4 4 4 . . . . 
            . . 4 4 . . . . 
            . 4 4 . . . . . 
            . 4 4 4 . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f f f f . 
            . . f f f f f . 
            `,img`
            . 5 5 5 . . . . 
            . . 5 5 . . . . 
            . 5 5 . . . . . 
            . 5 5 5 . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f f f f . 
            . . f f f f f . 
            `,img`
            . . 5 . . . . . 
            . . . 5 . . . . 
            . . 5 . . . . . 
            . 5 . 5 . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f f f f . 
            . . f f f f f . 
            `,img`
            . . . . . . . . 
            . . . 5 . . . . 
            . . 5 . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f f f f . 
            . . f f f f f . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f 1 f 1 . 
            . . f f f f f . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f 1 f 1 . 
            . . f f f f f . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f 1 f 1 . 
            . . f f f f f . 
            . . f . f . f . 
            `],
        200,
        characterAnimations.rule(Predicate.NotMoving)
        )
        characterAnimations.loopFrames(
        mySprite,
        [img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . f . f . . . f 
            . f f f . . . f 
            . 1 f 1 f f f . 
            . f f f f f . . 
            f . f . . . f . 
            `],
        200,
        characterAnimations.rule(Predicate.MovingUp, Predicate.FacingLeft)
        )
        characterAnimations.loopFrames(
        mySprite,
        [img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . f . 
            . f . f . . f . 
            . f f f . . f . 
            . 1 f 1 f f . . 
            . f f f f f . . 
            f . f . f . . . 
            `],
        200,
        characterAnimations.rule(Predicate.MovingDown, Predicate.FacingLeft)
        )
        characterAnimations.loopFrames(
        mySprite,
        [img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f 1 f 1 . 
            . . f f f f f . 
            . f . . . f . f 
            `],
        200,
        characterAnimations.rule(Predicate.MovingUp, Predicate.FacingRight)
        )
        characterAnimations.loopFrames(
        mySprite,
        [img`
            . . . . . . . . 
            . . . . . . . . 
            . f . . . . . . 
            . f . . f . f . 
            . f . . f f f . 
            . . f f 1 f 1 . 
            . . f f f f f . 
            . . . f . f . f 
            `],
        200,
        characterAnimations.rule(Predicate.MovingDown, Predicate.FacingRight)
        )
        characterAnimations.loopFrames(
        mySprite,
        [img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f 1 f 1 . 
            . . f f f f f . 
            . f . . . f . f 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            f . . . f . f . 
            f . . . f f f . 
            . f f f 1 f 1 . 
            . . f f f f f . 
            `],
        200,
        characterAnimations.rule(Predicate.MovingRight)
        )
        characterAnimations.loopFrames(
        mySprite,
        [img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . f . f . . . f 
            . f f f . . . f 
            . 1 f 1 f f f . 
            . f f f f f . . 
            f . f . . . f . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . f . f . . . f 
            . f f f . . . f 
            . 1 f 1 f f f . 
            . f f f f f . . 
            `],
        200,
        characterAnimations.rule(Predicate.MovingLeft)
        )
        Skin = 0
    }
    if (Skin == 1) {
        if (Perfects >= 3) {
            characterAnimations.loopFrames(
            mySprite,
            [img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 1 f 1 . 
                . . f f 4 f 4 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 1 f 1 . 
                . . f f 4 f 4 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 1 f 1 . 
                . . f f 4 f 4 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . e . e . e . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . e . e . e . 
                . . e . e . e . 
                . . f . f . f . 
                `,img`
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . e . e . e . 
                . . e . e . e . 
                . . e . e . e . 
                . . f . f . f . 
                `,img`
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . e . e . e . 
                . . e . e . e . 
                . . e . e . e . 
                . . 4 . f . f . 
                `,img`
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . e . e . e . 
                . . e . e . e . 
                . . e . e . e . 
                . . f . 4 . f . 
                `,img`
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . e . e . e . 
                . . e . e . e . 
                . . e . e . e . 
                . . f . f . 4 . 
                `,img`
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . e . e . e . 
                . . e . e . e . 
                . . e . e . e . 
                . . 4 . f . f . 
                `,img`
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . e . e . e . 
                . . e . e . e . 
                . . e . e . e . 
                . . f . 4 . f . 
                `,img`
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . e . e . e . 
                . . e . e . e . 
                . . e . e . e . 
                . . f . f . 4 . 
                `,img`
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . e . e . e . 
                . . e . e . e . 
                . . e . e . e . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . e . e . e . 
                . . e . e . e . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . e . e . e . 
                . . e . e . e . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . e . e . e . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . f . f . f . 
                `],
            200,
            characterAnimations.rule(Predicate.NotMoving)
            )
            characterAnimations.loopFrames(
            mySprite,
            [img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . 4 . 4 . . . 5 
                . f f f . . . 5 
                . 5 f 5 f f 5 . 
                . 4 f 4 f f . . 
                f . f . . . f . 
                `],
            200,
            characterAnimations.rule(Predicate.MovingUp, Predicate.FacingLeft)
            )
            characterAnimations.loopFrames(
            mySprite,
            [img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . 5 . 
                . 4 . 4 . . 5 . 
                . f f f . . 5 . 
                . 5 f 5 f f . . 
                . 4 f 4 f f . . 
                f . f . f . . . 
                `],
            200,
            characterAnimations.rule(Predicate.MovingDown, Predicate.FacingLeft)
            )
            characterAnimations.loopFrames(
            mySprite,
            [img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . f . . . f . f 
                `],
            200,
            characterAnimations.rule(Predicate.MovingUp, Predicate.FacingRight)
            )
            characterAnimations.loopFrames(
            mySprite,
            [img`
                . . . . . . . . 
                . . . . . . . . 
                . 5 . . . . . . 
                . 5 . . 4 . 4 . 
                . 5 . . f f f . 
                . . f f 5 f 5 . 
                . . f f 4 f 4 . 
                . . . f . f . f 
                `],
            200,
            characterAnimations.rule(Predicate.MovingDown, Predicate.FacingRight)
            )
            characterAnimations.loopFrames(
            mySprite,
            [img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                . f . . . f . f 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 4 . 4 . 
                5 . . . f f f . 
                . 5 f f 5 f 5 . 
                . . f f 4 f 4 . 
                `],
            200,
            characterAnimations.rule(Predicate.MovingRight)
            )
            characterAnimations.loopFrames(
            mySprite,
            [img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . 4 . 4 . . . 5 
                . f f f . . . 5 
                . 5 f 5 f f 5 . 
                . 4 f 4 f f . . 
                f . f . . . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . 4 . 4 . . . 5 
                . f f f . . . 5 
                . 5 f 5 f f 5 . 
                . 4 f 4 f f . . 
                `],
            200,
            characterAnimations.rule(Predicate.MovingLeft)
            )
            Skin = 1
        }
    }
    if (Skin == 2) {
        if (Perfects >= 9) {
            characterAnimations.loopFrames(
            mySprite,
            [img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 2 2 . 
                . 2 2 2 9 2 9 . 
                . . 2 2 2 2 2 . 
                . . 2 . 2 . 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 3 . 
                2 . . . 2 2 3 . 
                . 2 2 2 9 2 9 . 
                . . 2 2 2 2 3 . 
                . . 2 . 2 . 3 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 3 2 . 
                . 2 2 2 9 3 9 . 
                . . 2 2 2 3 2 . 
                . . 2 . 2 . 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 3 . 2 . 
                2 . . . 3 2 2 . 
                . 2 2 2 9 2 9 . 
                . . 2 2 3 2 2 . 
                . . 2 . 3 . 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 2 2 . 
                . 2 2 3 9 2 9 . 
                . . 2 3 2 2 2 . 
                . . 2 . 2 . 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 2 2 . 
                . 2 3 2 9 2 9 . 
                . . 3 2 2 2 2 . 
                . . 3 . 2 . 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 2 2 . 
                . 3 2 2 9 2 9 . 
                . . 2 2 2 2 2 . 
                . . 2 . 2 . 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                3 . . . 2 . 2 . 
                3 . . . 2 2 2 . 
                . 2 2 2 9 2 9 . 
                . . 2 2 2 2 2 . 
                . . 2 . 2 . 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 2 2 . 
                . 2 2 2 9 2 9 . 
                . . 2 2 2 2 2 . 
                . . 2 . 2 . 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 3 . 
                2 . . . 2 2 3 . 
                . 2 2 2 9 2 9 . 
                . . 2 2 2 2 3 . 
                . . 2 . 2 . 3 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 3 2 . 
                . 2 2 2 9 3 9 . 
                . . 2 2 2 3 2 . 
                . . 2 . 2 . 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 3 . 2 . 
                2 . . . 3 2 2 . 
                . 2 2 2 9 2 9 . 
                . . 2 2 3 2 2 . 
                . . 2 . 3 . 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 2 2 . 
                . 2 2 3 9 2 9 . 
                . . 2 3 2 2 2 . 
                . . 2 . 2 . 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 2 2 . 
                . 2 3 2 9 2 9 . 
                . . 3 2 2 2 2 . 
                . . 3 . 2 . 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 2 2 . 
                . 3 2 2 9 2 9 . 
                . . 2 2 2 2 2 . 
                . . 2 . 2 . 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                3 . . . 2 . 2 . 
                3 . . . 2 2 2 . 
                . 2 2 2 9 2 9 . 
                . . 2 2 2 2 2 . 
                . . 2 . 2 . 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 2 2 . 
                . 2 2 2 9 2 9 . 
                . . 2 2 2 2 2 . 
                . . 2 . 2 . 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 3 . 
                2 . . . 2 2 3 . 
                . 2 2 2 9 2 9 . 
                . . 2 2 2 2 3 . 
                . . 2 . 2 . 3 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 3 2 . 
                . 2 2 2 9 3 9 . 
                . . 2 2 2 3 2 . 
                . . 2 . 2 . 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 3 . 2 . 
                2 . . . 3 2 2 . 
                . 2 2 2 9 2 9 . 
                . . 2 2 3 2 2 . 
                . . 2 . 3 . 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 2 2 . 
                . 2 2 3 9 2 9 . 
                . . 2 3 2 2 2 . 
                . . 2 . 2 . 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 2 2 . 
                . 2 3 2 9 2 9 . 
                . . 3 2 2 2 2 . 
                . . 3 . 2 . 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 2 2 . 
                . 3 2 2 9 2 9 . 
                . . 2 2 2 2 2 . 
                . . 2 . 2 . 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                3 . . . 2 . 2 . 
                3 . . . 2 2 2 . 
                . 2 2 2 9 2 9 . 
                . . 2 2 2 2 2 . 
                . . 2 . 2 . 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 2 2 . 
                . 2 2 2 9 2 9 . 
                . . 2 2 2 2 2 . 
                . . 2 . 2 . 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 2 2 . 
                . 2 2 2 2 2 2 . 
                . . 2 2 2 2 2 . 
                . . 2 . 2 . 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 2 2 . 
                . 2 2 2 2 2 2 . 
                . . 2 2 2 2 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 2 2 . 
                . 2 2 2 2 2 2 . 
                . . 2 2 2 2 2 . 
                `,img`
                . 4 4 4 . . . . 
                . . 4 4 . . . . 
                . 4 4 . . . . . 
                . 4 4 4 . . . . 
                2 . . . 2 . 3 . 
                2 . . . 2 2 3 . 
                . 2 2 2 2 2 3 . 
                . . 2 2 2 2 3 . 
                `,img`
                . 4 4 4 . . . . 
                . . 4 4 . . . . 
                . 4 4 . . . . . 
                . 4 4 4 . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 3 2 . 
                . 2 2 2 2 3 2 . 
                . . 2 2 2 3 2 . 
                `,img`
                . 5 5 5 . . . . 
                . . 5 5 . . . . 
                . 5 5 . . . . . 
                . 5 5 5 . . . . 
                2 . . . 3 . 2 . 
                2 . . . 3 2 2 . 
                . 2 2 2 3 2 2 . 
                . . 2 2 3 2 2 . 
                `,img`
                . 4 4 4 . . . . 
                . . 4 4 . . . . 
                . 4 4 . . . . . 
                . 4 4 4 . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 2 2 . 
                . 2 2 3 2 2 2 . 
                . . 2 3 2 2 2 . 
                `,img`
                . 5 5 5 . . . . 
                . . 5 5 . . . . 
                . 5 5 . . . . . 
                . 5 5 5 . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 2 2 . 
                . 2 3 2 2 2 2 . 
                . . 3 2 2 2 2 . 
                `,img`
                . 4 4 4 . . . . 
                . . 4 4 . . . . 
                . 4 4 . . . . . 
                . 4 4 4 . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 2 2 . 
                . 3 2 2 2 2 2 . 
                . . 2 2 2 2 2 . 
                `,img`
                . 5 5 5 . . . . 
                . . 5 5 . . . . 
                . 5 5 . . . . . 
                . 5 5 5 . . . . 
                3 . . . 2 . 2 . 
                3 . . . 2 2 2 . 
                . 2 2 2 2 2 2 . 
                . . 2 2 2 2 2 . 
                `,img`
                . 4 4 4 . . . . 
                . . 4 4 . . . . 
                . 4 4 . . . . . 
                . 4 4 4 . . . . 
                2 . . . 2 . 3 . 
                2 . . . 2 2 3 . 
                . 2 2 2 2 2 3 . 
                . . 2 2 2 2 3 . 
                `,img`
                . 5 5 5 . . . . 
                . . 5 5 . . . . 
                . 5 5 . . . . . 
                . 5 5 5 . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 3 2 . 
                . 2 2 2 2 3 2 . 
                . . 2 2 2 3 2 . 
                `,img`
                . 4 4 4 . . . . 
                . . 4 4 . . . . 
                . 4 4 . . . . . 
                . 4 4 4 . . . . 
                2 . . . 3 . 2 . 
                2 . . . 3 2 2 . 
                . 2 2 2 3 2 2 . 
                . . 2 2 3 2 2 . 
                `,img`
                . 5 5 5 . . . . 
                . . 5 5 . . . . 
                . 5 5 . . . . . 
                . 5 5 5 . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 2 2 . 
                . 2 2 3 2 2 2 . 
                . . 2 3 2 2 2 . 
                `,img`
                . . 5 . . . . . 
                . . . 5 . . . . 
                . . 5 . . . . . 
                . 5 . 5 . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 2 2 . 
                . 2 3 2 2 2 2 . 
                . . 3 2 2 2 2 . 
                `,img`
                . . . . . . . . 
                . . . 5 . . . . 
                . . 5 . . . . . 
                . . . . . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 2 2 . 
                . 3 2 2 2 2 2 . 
                . . 2 2 2 2 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                3 . . . 2 . 2 . 
                3 . . . 2 2 2 . 
                . 2 2 2 9 2 9 . 
                . . 2 2 2 2 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 2 2 . 
                . 2 2 2 9 2 9 . 
                . . 2 2 2 2 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 2 2 . 
                . 2 2 2 9 2 9 . 
                . . 2 2 2 2 2 . 
                . . 2 . 2 . 2 . 
                `],
            200,
            characterAnimations.rule(Predicate.NotMoving)
            )
            characterAnimations.loopFrames(
            mySprite,
            [img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . 2 . 2 . . . 2 
                . 2 2 2 . . . 2 
                . 9 2 9 2 2 2 . 
                . 2 2 2 2 2 . . 
                2 . 2 . . . 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . 2 . 2 . . . 3 
                . 2 2 2 . . . 3 
                . 9 2 9 2 2 2 . 
                . 2 2 2 2 2 . . 
                2 . 2 . . . 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . 2 . 2 . . . 2 
                . 2 2 2 . . . 2 
                . 9 2 9 2 2 3 . 
                . 2 2 2 2 2 . . 
                2 . 2 . . . 3 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . 2 . 2 . . . 2 
                . 2 2 2 . . . 2 
                . 9 2 9 2 3 2 . 
                . 2 2 2 2 3 . . 
                2 . 2 . . . 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . 2 . 2 . . . 2 
                . 2 2 2 . . . 2 
                . 9 2 9 3 2 2 . 
                . 2 2 2 3 2 . . 
                2 . 2 . . . 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . 2 . 3 . . . 2 
                . 2 2 3 . . . 2 
                . 9 2 9 2 2 2 . 
                . 2 2 3 2 2 . . 
                2 . 2 . . . 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . 2 . 2 . . . 2 
                . 2 3 2 . . . 2 
                . 9 3 9 2 2 2 . 
                . 2 3 2 2 2 . . 
                2 . 3 . . . 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . 3 . 2 . . . 2 
                . 3 2 2 . . . 2 
                . 9 2 9 2 2 2 . 
                . 3 2 2 2 2 . . 
                2 . 2 . . . 2 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . 2 . 2 . . . 2 
                . 2 2 2 . . . 2 
                . 9 2 9 2 2 2 . 
                . 2 2 2 2 2 . . 
                3 . 2 . . . 2 . 
                `],
            200,
            characterAnimations.rule(Predicate.MovingUp, Predicate.FacingLeft)
            )
            characterAnimations.loopFrames(
            mySprite,
            [img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . 3 . 
                . 2 . 2 . . 3 . 
                . 2 2 2 . . 3 . 
                . 9 2 9 2 2 . . 
                . 2 2 2 2 2 . . 
                2 . 2 . 2 . . . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . 2 . 
                . 2 . 2 . . 2 . 
                . 2 2 2 . . 2 . 
                . 9 2 9 2 3 . . 
                . 2 2 2 2 3 . . 
                2 . 2 . 2 . . . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . 2 . 
                . 2 . 2 . . 2 . 
                . 2 2 2 . . 2 . 
                . 9 2 9 3 2 . . 
                . 2 2 2 3 2 . . 
                2 . 2 . 3 . . . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . 2 . 
                . 2 . 3 . . 2 . 
                . 2 2 3 . . 2 . 
                . 9 2 9 2 2 . . 
                . 2 2 3 2 2 . . 
                2 . 2 . 2 . . . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . 2 . 
                . 2 . 2 . . 2 . 
                . 2 3 2 . . 2 . 
                . 9 3 9 2 2 . . 
                . 2 3 2 2 2 . . 
                2 . 3 . 2 . . . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . 2 . 
                . 3 . 2 . . 2 . 
                . 3 2 2 . . 2 . 
                . 9 2 9 2 2 . . 
                . 3 2 2 2 2 . . 
                2 . 2 . 2 . . . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . 2 . 
                . 2 . 2 . . 2 . 
                . 2 2 2 . . 2 . 
                . 9 2 9 2 2 . . 
                . 2 2 2 2 2 . . 
                3 . 2 . 2 . . . 
                `],
            200,
            characterAnimations.rule(Predicate.MovingDown, Predicate.FacingLeft)
            )
            characterAnimations.loopFrames(
            mySprite,
            [img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 2 2 . 
                . 2 2 2 9 2 9 . 
                . . 2 2 2 2 2 . 
                . 2 . . . 2 . 2 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                3 . . . 2 . 2 . 
                3 . . . 2 2 2 . 
                . 2 2 2 9 2 9 . 
                . . 2 2 2 2 2 . 
                . 2 . . . 2 . 2 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 2 2 . 
                . 3 2 2 9 2 9 . 
                . . 2 2 2 2 2 . 
                . 3 . . . 2 . 2 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 2 2 . 
                . 2 3 2 9 2 9 . 
                . . 3 2 2 2 2 . 
                . 2 . . . 2 . 2 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 2 2 . 
                . 2 2 3 9 2 9 . 
                . . 2 3 2 2 2 . 
                . 2 . . . 2 . 2 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 3 . 2 . 
                2 . . . 3 2 2 . 
                . 2 2 2 9 2 9 . 
                . . 2 2 3 2 2 . 
                . 2 . . . 2 . 2 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 3 2 . 
                . 2 2 2 9 3 9 . 
                . . 2 2 2 3 2 . 
                . 2 . . . 3 . 2 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 3 . 
                2 . . . 2 2 3 . 
                . 2 2 2 9 2 9 . 
                . . 2 2 2 2 3 . 
                . 2 . . . 2 . 2 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 2 . 
                2 . . . 2 2 2 . 
                . 2 2 2 9 2 9 . 
                . . 2 2 2 2 2 . 
                . 2 . . . 2 . 3 
                `],
            200,
            characterAnimations.rule(Predicate.MovingUp, Predicate.FacingRight)
            )
            characterAnimations.loopFrames(
            mySprite,
            [img`
                . . . . . . . . 
                . . . . . . . . 
                . 3 . . . . . . 
                . 3 . . 2 . 2 . 
                . 3 . . 2 2 2 . 
                . . 2 2 9 2 9 . 
                . . 2 2 2 2 2 . 
                . . . 2 . 2 . 2 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . 2 . . . . . . 
                . 2 . . 2 . 2 . 
                . 2 . . 2 2 2 . 
                . . 3 2 9 2 9 . 
                . . 3 2 2 2 2 . 
                . . . 2 . 2 . 2 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . 2 . . . . . . 
                . 2 . . 2 . 2 . 
                . 2 . . 2 2 2 . 
                . . 2 3 9 2 9 . 
                . . 2 3 2 2 2 . 
                . . . 3 . 2 . 2 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . 2 . . . . . . 
                . 2 . . 3 . 2 . 
                . 2 . . 3 2 2 . 
                . . 2 2 9 2 9 . 
                . . 2 2 3 2 2 . 
                . . . 2 . 2 . 2 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . 2 . . . . . . 
                . 2 . . 2 . 2 . 
                . 2 . . 2 3 2 . 
                . . 2 2 9 3 9 . 
                . . 2 2 2 3 2 . 
                . . . 2 . 3 . 2 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . 2 . . . . . . 
                . 2 . . 2 . 3 . 
                . 2 . . 2 2 3 . 
                . . 2 2 9 2 9 . 
                . . 2 2 2 2 3 . 
                . . . 2 . 2 . 2 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . 2 . . . . . . 
                . 2 . . 2 . 2 . 
                . 2 . . 2 2 2 . 
                . . 2 2 9 2 9 . 
                . . 2 2 2 2 2 . 
                . . . 2 . 2 . 3 
                `],
            200,
            characterAnimations.rule(Predicate.MovingDown, Predicate.FacingRight)
            )
            characterAnimations.loopFrames(
            mySprite,
            [img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                3 . . . 3 . 2 . 
                3 . . . 3 3 2 . 
                . 3 2 2 9 3 9 . 
                . . 2 2 3 3 2 . 
                . 3 . . . 3 . 2 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                2 . . . 2 . 3 . 
                2 . . . 2 2 3 . 
                . 2 3 3 9 2 9 . 
                . . 3 3 2 2 3 . 
                `],
            200,
            characterAnimations.rule(Predicate.MovingRight)
            )
            characterAnimations.loopFrames(
            mySprite,
            [img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . 2 . 3 . . . 3 
                . 2 3 3 . . . 3 
                . 9 3 9 2 2 3 . 
                . 2 3 3 2 2 . . 
                2 . 3 . . . 3 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . 3 . 2 . . . 2 
                . 3 2 2 . . . 2 
                . 9 2 9 3 3 2 . 
                . 3 2 2 3 3 . . 
                `],
            200,
            characterAnimations.rule(Predicate.MovingLeft)
            )
            Skin = 2
        }
    }
    if (Skin == 3) {
        if (Perfects >= 15) {
            characterAnimations.loopFrames(
            mySprite,
            [img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                4 . . . 6 . 6 . 
                7 . . . f 7 f . 
                . 7 f f 4 7 4 . 
                . . f 6 7 7 7 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                4 . . . 6 . 6 . 
                7 . . . f 7 f . 
                . 7 f f 4 7 4 . 
                . . f 6 7 7 7 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                4 . . . 6 . 6 . 
                7 . . . f 7 f . 
                . 7 f f 4 7 4 . 
                . . f 6 7 7 7 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                4 . . . 6 . 6 . 
                7 . . . f 7 f . 
                . 7 f f 4 7 4 . 
                . . f 6 7 7 7 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                4 . . . 6 . 6 . 
                7 . . . f 7 f . 
                . 7 f f 4 7 4 . 
                . . f 6 7 7 7 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                4 . . . 6 . 6 . 
                7 . . . f 7 f . 
                . 7 f f 4 7 4 . 
                . . f 6 7 7 7 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                4 . . . 6 . 6 . 
                7 . . . f 7 f . 
                . 7 f f 4 7 4 . 
                . . f 6 7 7 7 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                4 . . . 6 . 6 . 
                7 . . . f 7 f . 
                . 7 f f 4 7 4 . 
                . . f 6 7 7 7 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                4 . . . 6 . 6 . 
                7 . . . f 7 f . 
                . 7 f f 4 7 4 . 
                . . f 6 7 7 7 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                4 . . . 6 . 6 . 
                7 . . . f 7 f . 
                . 7 f f 4 7 4 . 
                . . f 6 7 7 7 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . 6 . 6 . 
                4 . . . f 7 f . 
                7 . . . 4 7 4 . 
                . 7 f f 7 7 7 . 
                . . f 6 f 6 f . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . 6 . 6 . 
                4 . . . f 7 f . 
                7 . . . 4 7 4 . 
                . 7 f f 7 7 7 . 
                . . f 6 f 6 f . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . 6 . 6 . 
                4 . . . f 7 f . 
                7 . . . f 7 f . 
                . 7 f f 7 7 7 . 
                . . f 6 f 6 f . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . 6 . 6 . 
                4 . . . f 7 f . 
                7 . . . 4 7 4 . 
                . 7 f f 7 7 7 . 
                . . f 6 f 6 f . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . 6 . 6 . 
                4 . . . f 7 f . 
                7 . . . 4 7 4 . 
                . 7 f f 7 7 7 . 
                . . f 6 f 6 f . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . 6 . 6 . 
                4 . . . f 7 f . 
                7 . . . 4 7 4 . 
                . 7 f f 7 7 7 . 
                . . f 6 f 6 f . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . 6 . 6 . 
                4 . . . f 7 f . 
                7 . . . 4 7 4 . 
                . 7 f f 7 7 7 . 
                . . f 6 f 6 f . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . 6 . 6 . 
                4 . . . f 7 f . 
                7 . . . 4 7 4 . 
                . 7 f f 7 7 7 . 
                . . f 6 f 6 f . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                4 . . . 6 . 6 . 
                7 . . . f 7 f . 
                . 7 f f 4 7 4 . 
                . . f 6 7 7 7 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                4 . . . 6 . 6 . 
                7 . . . f 7 f . 
                . 7 f f 4 7 4 . 
                . . f 6 7 7 7 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                4 . . . 6 . 6 . 
                7 . . . f 7 f . 
                . 7 f f 4 7 4 . 
                . . f 6 7 7 7 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                4 . . . 6 . 6 . 
                7 . . . f 7 f . 
                . 7 f f 4 7 4 . 
                . . f 6 7 7 7 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                4 . . . 6 . 6 . 
                7 . . . f 7 f . 
                . 7 f f 4 7 4 . 
                . . f 6 7 7 7 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                4 . . . 6 . 6 . 
                7 . . . f 7 f . 
                . 7 f f 4 7 4 . 
                . . f 6 7 7 7 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                4 . . . 6 . 6 . 
                7 . . . f 7 f . 
                . 7 f f 4 7 4 . 
                . . f 6 7 7 7 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                4 . . . 6 . 6 . 
                7 . . . f 7 f . 
                . 7 f f 4 7 4 . 
                . . f 6 7 7 7 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                4 . . . 6 . 6 . 
                7 . . . f 7 f . 
                . 7 f f 4 7 4 . 
                . . f 6 7 7 7 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                4 . . . 6 . 6 . 
                7 . . . f 7 f . 
                . 7 f f 4 7 4 . 
                . . f 6 7 7 7 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                4 . . . 6 . 6 . 
                7 . . . f 7 f . 
                . 7 f f 4 7 4 . 
                . . f 6 7 7 7 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                4 . . . 6 . 6 . 
                7 . . . f 7 f . 
                . 7 f f 4 7 4 . 
                . . f 6 7 7 7 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . 6 . 6 . 
                4 . . . f 7 f . 
                7 . . f 4 7 4 . 
                . 7 f 6 7 7 7 . 
                . . f . f . f . 
                . . f . . . . . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                4 . . . 6 . 6 . 
                7 . . . f 7 f . 
                . 7 f f 4 7 4 . 
                . . f 6 7 7 7 . 
                . . 5 . 5 . 5 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                4 . . . 6 . 6 . 
                7 . . . f 7 f . 
                . 7 f f 4 7 4 . 
                . . 5 5 5 5 5 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                4 . . . 6 . 6 . 
                7 . . . f 7 f . 
                . 5 5 5 5 5 5 . 
                . . f f f f f . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                4 . . . 6 . 6 . 
                5 . . . 5 5 5 . 
                . f f f 1 f 1 . 
                . . f f f f f . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 5 . 5 . 
                f . . . f f f . 
                . f f f 1 f 1 . 
                . . f f f f f . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                f . . . f . f . 
                f . . . f f f . 
                . f f f 1 f 1 . 
                . . f f f f f . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                f . . . f . f . 
                f . . . f f f . 
                . f f f 1 f 1 . 
                . . f f f f f . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                f . . . f . f . 
                f . . . f f f . 
                . f f f 1 f 1 . 
                . . f f f f f . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                f . . . f . f . 
                f . . . f f f . 
                . f f f 1 f f . 
                . . f f f f f . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                f . . . f . f . 
                f . . . f f f . 
                . f f f 1 f 1 . 
                . . f f f f f . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                f . . . f . f . 
                f . . . f f f . 
                . f f f 1 f 1 . 
                . . f f f f f . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                f . . . f . f . 
                f . . . f f f . 
                . f f f 1 f 1 . 
                . . f f f f f . 
                . . 5 . 5 . 5 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                f . . . f . f . 
                f . . . f f f . 
                . f f f 1 f 1 . 
                . . 5 5 5 5 5 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                f . . . f . f . 
                f . . . f f f . 
                . 5 5 5 5 5 5 . 
                . . f 6 7 7 7 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                f . . . f . f . 
                5 . . . 5 5 5 . 
                . 7 f f 4 7 4 . 
                . . f 6 7 7 7 . 
                . . f . f . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 5 . 5 . 
                7 . . . f 7 f . 
                . 7 f f 4 7 4 . 
                . . f 6 7 7 7 . 
                . . f . f . f . 
                `],
            200,
            characterAnimations.rule(Predicate.NotMoving)
            )
            characterAnimations.loopFrames(
            mySprite,
            [img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . 6 . 6 . . . 4 
                . f 7 f . . . 7 
                . 4 7 4 f f 7 . 
                . 7 7 7 6 f . . 
                f . f . . . f . 
                `],
            200,
            characterAnimations.rule(Predicate.MovingUp, Predicate.FacingLeft)
            )
            characterAnimations.loopFrames(
            mySprite,
            [img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . 4 . 
                . 6 . 6 . . 7 . 
                . f 7 f . . 7 . 
                . 4 7 4 f f . . 
                . 7 7 7 6 f . . 
                f . f . f . . . 
                `],
            200,
            characterAnimations.rule(Predicate.MovingDown, Predicate.FacingLeft)
            )
            characterAnimations.loopFrames(
            mySprite,
            [img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                f . . . 6 . 6 . 
                7 . . . f 7 f . 
                . 7 f f 4 7 4 . 
                . . f 6 7 7 7 . 
                . f . . . f . f 
                `],
            200,
            characterAnimations.rule(Predicate.MovingUp, Predicate.FacingRight)
            )
            characterAnimations.loopFrames(
            mySprite,
            [img`
                . . . . . . . . 
                . . . . . . . . 
                . 4 . . . . . . 
                . 7 . . 6 . 6 . 
                . 7 . . f 7 f . 
                . . f f 4 7 4 . 
                . . f 6 7 7 7 . 
                . . . f . f . f 
                `],
            200,
            characterAnimations.rule(Predicate.MovingDown, Predicate.FacingRight)
            )
            characterAnimations.loopFrames(
            mySprite,
            [img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                4 . . . 6 . 6 . 
                7 . . . f 7 f . 
                . 7 f f 4 7 4 . 
                . . f 6 7 7 7 . 
                . f . . . f . f 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                4 . . . 6 . 6 . 
                7 . . . f 7 f . 
                . 7 f f 4 7 4 . 
                . . f 6 7 7 7 . 
                `],
            200,
            characterAnimations.rule(Predicate.MovingRight)
            )
            characterAnimations.loopFrames(
            mySprite,
            [img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . 6 . 6 . . . 4 
                . f 7 f . . . 7 
                . 4 7 4 f f 7 . 
                . 7 7 7 6 f . . 
                f . f . . . f . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . 6 . 6 . . . 4 
                . f 7 f . . . 7 
                . 4 7 4 f f 7 . 
                . 7 7 7 6 f . . 
                `],
            200,
            characterAnimations.rule(Predicate.MovingLeft)
            )
            Skin = 3
        }
    }
    if (Skin == 4) {
        if (Perfects >= 23) {
            characterAnimations.loopFrames(
            mySprite,
            [img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                3 . . . 7 . 3 . 
                3 . . . 7 5 3 . 
                . 7 5 3 1 5 1 . 
                . . 5 3 7 5 3 . 
                . . 5 . 7 . 3 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                7 . . . 5 . 7 . 
                7 . . . 5 3 7 . 
                . 5 3 7 1 3 1 . 
                . . 3 7 5 3 7 . 
                . . 3 . 5 . 7 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 3 . 5 . 
                5 . . . 3 7 5 . 
                . 3 7 5 1 7 1 . 
                . . 7 5 3 7 5 . 
                . . 7 . 3 . 5 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                3 . . . 7 . 3 . 
                3 . . . 7 5 3 . 
                . 7 5 3 1 5 1 . 
                . . 5 3 7 5 3 . 
                . . 5 . 7 . 3 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                7 . . . 5 . 7 . 
                7 . . . 5 3 7 . 
                . 5 3 7 1 3 1 . 
                . . 3 7 5 3 7 . 
                . . 3 . 5 . 7 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 3 . 5 . 
                5 . . . 3 7 5 . 
                . 3 7 5 1 7 1 . 
                . . 7 5 3 7 5 . 
                . . 7 . 3 . 5 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                3 . . . 7 . 3 . 
                3 . . . 7 5 3 . 
                . 7 5 3 1 5 1 . 
                . . 5 3 7 5 3 . 
                . . 5 . 7 . 3 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                7 . . . 5 . 7 . 
                7 . . . 5 3 7 . 
                . 5 3 7 5 3 7 . 
                . . 3 7 5 3 7 . 
                . . 3 . 5 . 7 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 3 . 5 . 
                5 . . . 3 7 5 . 
                . 3 7 5 1 7 1 . 
                . . 7 5 3 7 5 . 
                . . 7 . 3 . 5 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                3 . . . 7 . 3 . 
                3 . . . 7 5 3 . 
                . 7 5 3 1 5 1 . 
                . . 5 3 7 5 3 . 
                . . 5 . 7 . 3 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                7 . . . 5 . 7 . 
                7 . . . 5 3 7 . 
                . 5 3 7 1 3 1 . 
                . . 3 7 5 3 7 . 
                . . 3 . 5 . 7 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 3 . 5 . 
                5 . . . 3 7 5 . 
                . 3 7 5 1 7 1 . 
                . . 7 5 3 7 5 . 
                . . 7 . 3 . 5 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                3 . . . 7 . 3 . 
                3 . . . 7 5 3 . 
                . 7 5 3 1 5 1 . 
                . . 5 3 7 5 3 . 
                . . 5 . 7 . 3 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                7 . . . 5 . 7 . 
                7 . . . 5 3 7 . 
                . 5 3 7 1 3 1 . 
                . . 3 7 5 3 7 . 
                . . 3 . 5 . 7 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 3 . 5 . 
                5 . . . 3 7 5 . 
                . 3 7 5 1 7 1 . 
                . . 7 5 3 7 5 . 
                . . 7 . 3 . 5 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                3 . . . 7 . 3 . 
                3 . . . 7 5 3 . 
                . 7 5 3 1 5 1 . 
                . . 5 3 7 5 3 . 
                . . 5 . 7 . 3 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                7 . . . 5 . 7 . 
                7 . . . 5 3 7 . 
                . 5 3 7 1 3 1 . 
                . . 3 7 5 3 7 . 
                . . 3 . 5 . 7 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 3 . 5 . 
                5 . . . 3 7 5 . 
                . 3 7 5 1 7 1 . 
                . . 7 5 3 7 5 . 
                . . 7 . 3 . 5 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                3 . . . 7 . 3 . 
                3 . . . 7 5 3 . 
                . 7 5 3 1 5 1 . 
                . . 5 3 7 5 3 . 
                . . 5 . 7 . 3 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                7 . . . 5 . 7 . 
                7 . . . 5 3 7 . 
                . 5 3 7 1 3 1 . 
                . . 3 7 5 3 7 . 
                . . 3 . 5 . 7 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 3 . 5 . 
                5 . . . 3 7 5 . 
                . 3 7 5 1 7 1 . 
                . . 7 5 3 7 5 . 
                . . 7 . 3 . 5 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                3 . . . 7 . 3 . 
                3 . . . 7 5 3 . 
                . 7 5 3 1 5 1 . 
                . . 5 3 7 5 3 . 
                . . 5 . 7 . 3 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                7 . . . 5 . 7 . 
                7 . . . 5 3 7 . 
                . 5 3 7 1 3 1 . 
                . . 3 7 5 3 7 . 
                . . 3 . 5 . 7 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 3 . 5 . 
                5 . . . 3 7 5 . 
                . 3 7 5 1 7 1 . 
                . . 7 5 3 7 5 . 
                . . 7 . 3 . 5 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                3 . . . 7 . 3 . 
                3 . . . 7 5 3 . 
                . 7 5 3 1 5 1 . 
                . . 5 3 7 5 3 . 
                . . 5 . 7 . 3 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                b . . . e . b . 
                b . . . e d b . 
                . e d b 1 d 1 . 
                . . d b e d b . 
                . . d . e . b . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                b . . . e . b . 
                b . . . e d b . 
                . e d b 1 d 1 . 
                . . d b e d b . 
                . . d . e . b . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                b . . . e . b . 
                b . . . e d b . 
                . e d b 1 d 1 . 
                . . d b e d b . 
                . . d . e . b . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                b . . . e . b . 
                b . . . e d b . 
                . e d b 1 d 1 . 
                . . d b e d b . 
                . . d . e . b . 
                `,img`
                . 5 5 5 . . . . 
                . . . 5 . . . . 
                . . 5 5 . . . . 
                b . . . e . b . 
                b . 5 . e d b . 
                . e d b 1 d 1 . 
                . . d b e d b . 
                . . d . e . b . 
                `,img`
                . 4 4 4 . . . . 
                . . . 4 . . . . 
                . . 4 4 . . . . 
                b . . . e . b . 
                b . 4 . e d b . 
                . e d b 1 d 1 . 
                . . d b e d b . 
                . . d . e . b . 
                `,img`
                . 5 5 5 . . . . 
                . . . 5 . . . . 
                . . 5 5 . . . . 
                b . . . e . b . 
                b . 5 . e d b . 
                . e d b 1 d 1 . 
                . . d b e d b . 
                . . d . e . b . 
                `,img`
                . 4 4 4 . . . . 
                . . . 4 . . . . 
                . . 4 4 . . . . 
                b . . . e . b . 
                b . 4 . e d b . 
                . e d b 1 d 1 . 
                . . d b e d b . 
                . . d . e . b . 
                `,img`
                . 5 5 5 . . . . 
                . . . 5 . . . . 
                . . 5 5 . . . . 
                b . . . e . b . 
                b . 5 . e d b . 
                . e d b 1 d 1 . 
                . . d b e d b . 
                . . d . e . b . 
                `,img`
                . 4 4 4 . . . . 
                . . . 4 . . . . 
                . . 4 4 . . . . 
                b . . . e . b . 
                b . 4 . e d b . 
                . e d b 1 d 1 . 
                . . d b e d b . 
                . . d . e . b . 
                `,img`
                . 5 5 5 . . . . 
                . . . 5 . . . . 
                . . 5 5 . . . . 
                b . . . e . b . 
                b . 5 . e d b . 
                . e d b 1 d 1 . 
                . . d b e d b . 
                . . d . e . b . 
                `,img`
                . 4 4 4 . . . . 
                . . . 4 . . . . 
                . . 4 4 . . . . 
                b . . . e . b . 
                b . 4 . e d b . 
                . e d b 1 d 1 . 
                . . d b e d b . 
                . . d . e . b . 
                `,img`
                . 5 5 5 . . . . 
                . . . 5 . . . . 
                . . 5 5 . . . . 
                b . . . e . b . 
                b . 5 . e d b . 
                . e d b 1 d 1 . 
                . . d b e d b . 
                . . d . e . b . 
                `,img`
                . 5 . . . . . . 
                . . . 5 . . . . 
                . . 5 . . . . . 
                b . . . e . b . 
                b . 5 . e d b . 
                . e d b 1 d 1 . 
                . . d b e d b . 
                . . d . e . b . 
                `,img`
                . . . . . . . . 
                . . . 5 . . . . 
                . . 5 . . . . . 
                b . . . e . b . 
                b . . . e d b . 
                . e d b 1 d 1 . 
                . . d b e d b . 
                . . d . e . b . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                b . . . e . b . 
                b . . . e d b . 
                . e d b 1 d 1 . 
                . . d b e d b . 
                . . d . e . b . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                3 . . . 7 . 3 . 
                3 . . . 7 5 3 . 
                . 7 5 3 1 5 1 . 
                . . 5 3 7 5 3 . 
                . . 5 . 7 . 3 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                7 . . . 5 . 7 . 
                7 . . . 5 3 7 . 
                . 5 3 7 1 3 1 . 
                . . 3 7 5 3 7 . 
                . . 3 . 5 . 7 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 3 . 5 . 
                5 . . . 3 7 5 . 
                . 3 7 5 1 7 1 . 
                . . 7 5 3 7 5 . 
                . . 7 . 3 . 5 . 
                `],
            200,
            characterAnimations.rule(Predicate.NotMoving)
            )
            characterAnimations.loopFrames(
            mySprite,
            [img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . 7 . 3 . . . 7 
                . 7 5 3 . . . 7 
                . 9 5 9 7 5 3 . 
                . 7 5 3 7 5 . . 
                3 . 5 . . . 3 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . 5 . 7 . . . 5 
                . 5 3 7 . . . 5 
                . 9 3 9 5 3 7 . 
                . 5 3 7 5 3 . . 
                7 . 3 . . . 7 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . 3 . 5 . . . 3 
                . 3 7 5 . . . 3 
                . 9 7 9 3 7 5 . 
                . 3 7 5 3 7 . . 
                5 . 7 . . . 5 . 
                `],
            200,
            characterAnimations.rule(Predicate.MovingUp, Predicate.FacingLeft)
            )
            characterAnimations.loopFrames(
            mySprite,
            [img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . 3 . 
                . 7 . 3 . . 3 . 
                . 7 5 3 . . 3 . 
                . 9 5 9 7 5 . . 
                . 7 5 3 7 5 . . 
                3 . 5 . 7 . . . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . 7 . 
                . 5 . 7 . . 7 . 
                . 5 3 7 . . 7 . 
                . 9 3 9 5 3 . . 
                . 5 3 7 5 3 . . 
                7 . 3 . 5 . . . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . 5 . 
                . 3 . 5 . . 5 . 
                . 3 7 5 . . 5 . 
                . 9 7 9 3 7 . . 
                . 3 7 5 3 7 . . 
                5 . 7 . 3 . . . 
                `],
            200,
            characterAnimations.rule(Predicate.MovingDown, Predicate.FacingLeft)
            )
            characterAnimations.loopFrames(
            mySprite,
            [img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                7 . . . 3 . 7 . 
                7 . . . 3 5 7 . 
                . 3 5 7 9 5 9 . 
                . . 5 7 3 5 7 . 
                . 3 . . . 5 . 3 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 7 . 5 . 
                5 . . . 7 3 5 . 
                . 7 3 5 9 3 9 . 
                . . 3 5 7 3 5 . 
                . 7 . . . 3 . 7 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                3 . . . 5 . 3 . 
                3 . . . 5 7 3 . 
                . 5 7 3 9 7 9 . 
                . . 7 3 5 7 3 . 
                . 5 . . . 7 . 5 
                `],
            200,
            characterAnimations.rule(Predicate.MovingUp, Predicate.FacingRight)
            )
            characterAnimations.loopFrames(
            mySprite,
            [img`
                . . . . . . . . 
                . . . . . . . . 
                . 3 . . . . . . 
                . 3 . . 3 . 7 . 
                . 3 . . 3 5 7 . 
                . . 5 7 9 5 9 . 
                . . 5 7 3 5 7 . 
                . . . 7 . 5 . 3 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . 7 . . . . . . 
                . 7 . . 7 . 5 . 
                . 7 . . 7 3 5 . 
                . . 3 5 9 3 9 . 
                . . 3 5 7 3 5 . 
                . . . 5 . 3 . 7 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . 5 . . . . . . 
                . 5 . . 5 . 3 . 
                . 5 . . 5 7 3 . 
                . . 7 3 9 7 9 . 
                . . 7 3 5 7 3 . 
                . . . 3 . 7 . 5 
                `],
            200,
            characterAnimations.rule(Predicate.MovingDown, Predicate.FacingRight)
            )
            characterAnimations.loopFrames(
            mySprite,
            [img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                7 . . . 3 . 7 . 
                7 . . . 3 5 7 . 
                . 3 5 7 1 5 1 . 
                . . 5 7 3 5 7 . 
                . 3 . . . 5 . 3 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                3 . . . 5 . 3 . 
                3 . . . 5 7 3 . 
                . 5 7 3 1 7 1 . 
                . . 7 3 5 7 3 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 7 . 5 . 
                5 . . . 7 3 5 . 
                . 7 3 5 1 3 1 . 
                . . 3 5 7 3 5 . 
                . 7 . . . 3 . 7 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                7 . . . 3 . 7 . 
                7 . . . 3 5 7 . 
                . 3 5 7 1 5 1 . 
                . . 5 7 3 5 7 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                3 . . . 5 . 3 . 
                3 . . . 5 7 3 . 
                . 5 7 3 1 7 1 . 
                . . 7 3 5 7 3 . 
                . 5 . . . 7 . 5 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                5 . . . 7 . 5 . 
                5 . . . 7 3 5 . 
                . 7 3 5 1 3 1 . 
                . . 3 5 7 3 5 . 
                `],
            200,
            characterAnimations.rule(Predicate.MovingRight)
            )
            characterAnimations.loopFrames(
            mySprite,
            [img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . 7 . 3 . . . 7 
                . 7 5 3 . . . 7 
                . 1 5 1 7 5 3 . 
                . 7 5 3 7 5 . . 
                3 . 5 . . . 3 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . 3 . 5 . . . 3 
                . 3 7 5 . . . 3 
                . 1 7 1 3 7 5 . 
                . 3 7 5 3 7 . . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . 5 . 7 . . . 5 
                . 5 3 7 . . . 5 
                . 1 3 1 5 3 7 . 
                . 5 3 7 5 3 . . 
                7 . 3 . . . 7 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . 7 . 3 . . . 7 
                . 7 5 3 . . . 7 
                . 1 5 1 7 5 3 . 
                . 7 5 3 7 5 . . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . 3 . 5 . . . 3 
                . 3 7 5 . . . 3 
                . 1 7 1 3 7 5 . 
                . 3 7 5 3 7 . . 
                5 . 7 . . . 5 . 
                `,img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . 5 . 7 . . . 5 
                . 5 3 7 . . . 5 
                . 1 3 1 5 3 7 . 
                . 5 3 7 5 3 . . 
                `],
            200,
            characterAnimations.rule(Predicate.MovingLeft)
            )
            Skin = 4
        }
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Saw, function (sprite, otherSprite) {
    scene.cameraShake(4, 500)
    characterAnimations.setCharacterAnimationsEnabled(mySprite, false)
    animation.runImageAnimation(
    mySprite,
    [img`
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        f . . . f . f . 
        f . . . f f f . 
        . f f f 1 f 1 . 
        . . f f f f f . 
        . f . . . f . f 
        `,img`
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        5 . . . 5 . 5 . 
        5 . . . 5 5 5 . 
        . 5 5 5 4 5 4 . 
        . . 5 5 5 5 5 . 
        . 5 . . . 5 . 5 
        `],
    50,
    true
    )
    music.play(music.createSoundEffect(
    WaveShape.Noise,
    2471,
    2313,
    600,
    0,
    200,
    SoundExpressionEffect.Vibrato,
    InterpolationCurve.Logarithmic
    ), music.PlaybackMode.InBackground)
    info.changeLifeBy(-1)
    mySprite.setFlag(SpriteFlag.GhostThroughSprites, true)
    otherSprite.setImage(img`
        . . . d d . . . 
        . . d e e d . . 
        . d e f f e d . 
        d e f f f f e d 
        d e f f f f e d 
        . d e f f e d . 
        . . d e e d . . 
        . . . d d . . . 
        `)
    otherSprite.setKind(SpriteKind.Nothing)
    timer.after(500, function () {
        animation.stopAnimation(animation.AnimationTypes.All, mySprite)
        otherSprite.setKind(SpriteKind.Saw)
        otherSprite.setImage(img`
            . . . 5 5 . . . 
            . . 5 4 4 5 . . 
            . 5 4 f f 4 5 . 
            5 4 f f f f 4 5 
            5 4 f f f f 4 5 
            . 5 4 f f 4 5 . 
            . . 5 4 4 5 . . 
            . . . 5 5 . . . 
            `)
        mySprite.setFlag(SpriteFlag.GhostThroughSprites, false)
        characterAnimations.setCharacterAnimationsEnabled(mySprite, true)
    })
})
sprites.onOverlap(SpriteKind.Boss2, SpriteKind.Shot, function (sprite, otherSprite) {
    scene.cameraShake(4, 500)
    characterAnimations.setCharacterAnimationsEnabled(mySprite, false)
    animation.runImageAnimation(
    mySprite,
    [img`
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        f . . . f . f . 
        f . . . f f f . 
        . f f f 1 f 1 . 
        . . f f f f f . 
        . f . . . f . f 
        `,img`
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        5 . . . 5 . 5 . 
        5 . . . 5 5 5 . 
        . 5 5 5 4 5 4 . 
        . . 5 5 5 5 5 . 
        . 5 . . . 5 . 5 
        `],
    50,
    true
    )
    music.play(music.createSoundEffect(
    WaveShape.Noise,
    2471,
    2313,
    600,
    0,
    200,
    SoundExpressionEffect.Vibrato,
    InterpolationCurve.Logarithmic
    ), music.PlaybackMode.InBackground)
    info.changeLifeBy(-1)
    mySprite.setFlag(SpriteFlag.GhostThroughSprites, true)
    sprites.destroy(otherSprite)
    mySprite3.setFlag(SpriteFlag.GhostThroughSprites, true)
    timer.after(500, function () {
        animation.stopAnimation(animation.AnimationTypes.All, mySprite)
        mySprite.setFlag(SpriteFlag.GhostThroughSprites, false)
        mySprite3.setFlag(SpriteFlag.GhostThroughSprites, false)
        characterAnimations.setCharacterAnimationsEnabled(mySprite, true)
    })
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (GameStart == 1) {
        if (Orb == 1) {
            if (mySprite.vx == 0) {
                if (mySprite.vy == 0) {
                    Orb = 1.5
                    GameStart = 0
                    controller.moveSprite(mySprite, 0, 0)
                    music.play(music.createSoundEffect(
                    WaveShape.Noise,
                    5000,
                    1,
                    600,
                    0,
                    300,
                    SoundExpressionEffect.Vibrato,
                    InterpolationCurve.Logarithmic
                    ), music.PlaybackMode.InBackground)
                    characterAnimations.setCharacterAnimationsEnabled(mySprite, false)
                    animation.runImageAnimation(
                    mySprite,
                    [img`
                        . . . . . . . . 
                        . . . . . . . . 
                        . . . . . . . . 
                        . . . . . . . . 
                        3 . . . 3 . 3 . 
                        3 . . . 3 3 3 . 
                        . 3 3 3 3 3 3 . 
                        . . 3 3 3 3 3 . 
                        `,img`
                        . . . . . . . . 
                        . . . . . . . . 
                        . . . . . . . . 
                        . . . . . . . . 
                        2 . . . 2 . 2 . 
                        2 . . . 2 2 2 . 
                        . 2 2 2 2 2 2 . 
                        . . 2 2 2 2 2 . 
                        `],
                    200,
                    true
                    )
                    AddCycle()
                }
            }
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile2`, function (sprite, location) {
    if (controller.A.isPressed()) {
        timer.after(1, function () {
            controller.moveSprite(mySprite, 0, 0)
            tiles.setTileAt(location, assets.tile`transparency8`)
            music.stopAllSounds()
            music.play(music.createSong(hex`0078000408020109010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c8000a0000000100050405060708`), music.PlaybackMode.InBackground)
            scene.cameraShake(4, 500)
            color.startFadeFromCurrent(color.White, 1000)
            pause(5000)
            controller.moveSprite(mySprite, 70, 0)
            sprites.destroyAllSpritesOfKind(SpriteKind.Text)
            color.startFadeFromCurrent(color.originalPalette, 1000)
            PlayingLevel = 1
            tiles.setCurrentTilemap(tileUtil.createSmallMap(tilemap`level8`))
            tiles.placeOnTile(mySprite, tiles.getTileLocation(1, 13))
            textSprite2 = textsprite.create("Oh Kitten, you attempt to seek something forbidden.", 1, 15)
            tiles.placeOnTile(textSprite2, tiles.getTileLocation(20, 7))
            profilelife.setFilledLifeImage(img`
                . . . . . . . . 
                . e e . . f f . 
                e 5 5 e f 4 4 f 
                e 5 5 5 4 4 4 f 
                e 5 5 5 4 4 4 f 
                . e 5 5 4 4 f . 
                . . e 5 4 f . . 
                . . . e f . . . 
                `)
            profilelife.setEmptyLifeImage(img`
                . . . . . . . . 
                . e e . . f f . 
                e d d e f e e f 
                e d d d e e e f 
                e d d d e e e f 
                . e d d e e f . 
                . . e d e f . . 
                . . . e f . . . 
                `)
            profilelife.setMaxLife(3)
            info.setLife(3)
            Simulate_Spikes()
            music.play(music.createSong(hex`005a0004080c0300001c00010a006400f401640000040000000000000000000000000005000004360200000400011804000800021b9f08000c0001180c001000021b9f10001400011814001800021b9f18001c00011b1c002000021b9f20002400011d24002800021d2028002c00011d2c003000021d2030003400011d34003800021d2038003c00011d3c004000021d2040004400011d44004800021d2248004c00011d4c005000021d2250005400011b54005800021d2258005c00019a5c006000021d2260006400011864006800029f2468006c0001186c007000029f2470007400011874007800029f2478007c0001187c008000029f2480008400011884008800021b9f88008c0001188c009000021b9f90009400011894009800021b9f98009c00011b9c00a000021b9fa000a400011da400a800021d20a800ac00011dac00b000021d20b000b400011db400b800021d20b800bc00011dbc00c000021d20c000c400011dc400c800021d22c800cc00011dcc00d000021d22d000d400011bd400d800021d22d800dc00019adc00e000021d22e000e4000118e400e800029f24e800ec000118ec00f000029f24f000f4000118f400f800029f24f800fc000118fc000001029f2400010401011804010801019f08010c01011b10011401011814011801019f18011c01011b20012401011824012801019f28012c01011b30013401011d34013801012038013c01011d40014401011d44014801012048014c01011d50015401011d54015801012058015c01011d60016401011d64016801012068016c01012270017401012274017801012078017c0101227c018001012407001c00020a006400f401640000040000000000000000000000000000000003d80008000c00012410001400012718001c0001ab20002400012948004c00012450005400012758005c0001a660006400012488008c00012490009400012798009c0001aba000a4000129c800cc000129d000d4000127d800dc0001a6e000e400012408010c01012410011401012718011c0101ab20012401012928012c01012430013401012738013c0101ab3c014001012c40014401012948014c0101244e015001012450015401012758015c0101a660016401012468016c0101226c01700101247001740101a674017801012478017c0101227c018001012409010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c8003a010000010001031000110001061200130001061c001d0001052000210001033000310001063200330001063c003d00020305400041000103500051000103580059000203065a005b000106600061000103700071000106720073000106760077000106780079000106800081000103900091000106920093000106a000a1000103b000b1000106b200b3000106bc00bd00020305c000c1000103d000d100020306d200d3000106d800d9000103e000e1000103f000f1000106f200f3000106f600f7000106f800f900010600010101010308010901020306100111010303040718011901020306200121010103280129010203063001310103030407380139010203064001410101034801490102030650015101030304075801590102030660016101010368016901020306700171010303040778017901020306`), music.PlaybackMode.LoopingInBackground)
        })
    } else {
        mySprite.sayText("A", 50, false)
    }
})
info.onLifeZero(function () {
    timer.after(1, function () {
        info.changeLifeBy(3)
        color.startFade(color.White, color.originalPalette, 1000)
        tiles.placeOnRandomTile(mySprite, assets.tile`myTile41`)
        tiles.placeOnRandomTile(mySprite, assets.tile`myTile52`)
        music.play(music.createSoundEffect(
        WaveShape.Noise,
        2471,
        2313,
        600,
        9,
        1000,
        SoundExpressionEffect.Vibrato,
        InterpolationCurve.Logarithmic
        ), music.PlaybackMode.InBackground)
        if (PlayingLevel == 5) {
            tiles.placeOnTile(mySprite3, tiles.getTileLocation(146, 11))
            mySprite3.setKind(SpriteKind.Boss)
            mySprite3.vx = -20
        }
        if (PlayingLevel == 10) {
            tiles.placeOnRandomTile(mySprite3, assets.tile`myTile78`)
        }
        if (PlayingLevel == 15) {
            tiles.placeOnTile(mySprite3, tiles.getTileLocation(146, 11))
            mySprite3.setKind(SpriteKind.Boss)
        }
    })
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Hover, function (sprite, otherSprite) {
    scene.cameraShake(4, 500)
    characterAnimations.setCharacterAnimationsEnabled(mySprite, false)
    animation.runImageAnimation(
    mySprite,
    [img`
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        f . . . f . f . 
        f . . . f f f . 
        . f f f 1 f 1 . 
        . . f f f f f . 
        . f . . . f . f 
        `,img`
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        5 . . . 5 . 5 . 
        5 . . . 5 5 5 . 
        . 5 5 5 4 5 4 . 
        . . 5 5 5 5 5 . 
        . 5 . . . 5 . 5 
        `],
    50,
    true
    )
    music.play(music.createSoundEffect(
    WaveShape.Noise,
    2471,
    2313,
    600,
    0,
    200,
    SoundExpressionEffect.Vibrato,
    InterpolationCurve.Logarithmic
    ), music.PlaybackMode.InBackground)
    info.changeLifeBy(-1)
    mySprite.setFlag(SpriteFlag.GhostThroughSprites, true)
    otherSprite.setImage(img`
        . . . . . . . . 
        . . . . . . . . 
        . . b d d b . . 
        . b c f e c b . 
        . b c e f c b . 
        . . b d d b . . 
        . . . . . . . . 
        . . . . . . . . 
        `)
    otherSprite.setKind(SpriteKind.Nothing)
    timer.after(500, function () {
        animation.stopAnimation(animation.AnimationTypes.All, mySprite)
        otherSprite.setKind(SpriteKind.Hover)
        otherSprite.setImage(img`
            . . . . . . . . 
            . . . . . . . . 
            . 5 5 d d 5 5 . 
            5 4 4 f e 4 4 5 
            5 4 4 e f 4 4 5 
            . 5 5 d d 5 5 . 
            . . . . . . . . 
            . . . . . . . . 
            `)
        mySprite.setFlag(SpriteFlag.GhostThroughSprites, false)
        characterAnimations.setCharacterAnimationsEnabled(mySprite, true)
    })
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Spike, function (sprite, otherSprite) {
    scene.cameraShake(4, 500)
    characterAnimations.setCharacterAnimationsEnabled(mySprite, false)
    animation.runImageAnimation(
    mySprite,
    [img`
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        f . . . f . f . 
        f . . . f f f . 
        . f f f 1 f 1 . 
        . . f f f f f . 
        . f . . . f . f 
        `,img`
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        5 . . . 5 . 5 . 
        5 . . . 5 5 5 . 
        . 5 5 5 4 5 4 . 
        . . 5 5 5 5 5 . 
        . 5 . . . 5 . 5 
        `],
    50,
    true
    )
    music.play(music.createSoundEffect(
    WaveShape.Noise,
    2471,
    2313,
    600,
    0,
    200,
    SoundExpressionEffect.Vibrato,
    InterpolationCurve.Logarithmic
    ), music.PlaybackMode.InBackground)
    info.changeLifeBy(-1)
    mySprite.vy = 0
    mySprite.vy += -100
    mySprite.setFlag(SpriteFlag.GhostThroughSprites, true)
    timer.after(500, function () {
        animation.stopAnimation(animation.AnimationTypes.All, mySprite)
        mySprite.setFlag(SpriteFlag.GhostThroughSprites, false)
        characterAnimations.setCharacterAnimationsEnabled(mySprite, true)
    })
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile87`, function (sprite, location) {
    if (controller.A.isPressed()) {
        timer.after(1, function () {
            controller.moveSprite(mySprite, 0, 0)
            tiles.setTileAt(location, assets.tile`transparency8`)
            music.stopAllSounds()
            music.play(music.createSong(hex`0078000408020109010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c8000a0000000100050405060708`), music.PlaybackMode.InBackground)
            scene.cameraShake(4, 500)
            color.startFadeFromCurrent(color.White, 1000)
            pause(5000)
            controller.moveSprite(mySprite, 70, 0)
            sprites.destroyAllSpritesOfKind(SpriteKind.Text)
            color.startFadeFromCurrent(color.originalPalette, 1000)
            PlayingLevel = 12
            tiles.setCurrentTilemap(tileUtil.createSmallMap(tilemap`level22`))
            tiles.placeOnTile(mySprite, tiles.getTileLocation(1, 13))
            textSprite2 = textsprite.create("We can't just start today, it's too much.", 1, 15)
            tiles.placeOnTile(textSprite2, tiles.getTileLocation(17, 7))
            profilelife.setFilledLifeImage(img`
                . . . . . . . . 
                . e e . . f f . 
                e 5 5 e f 4 4 f 
                e 5 5 5 4 4 4 f 
                e 5 5 5 4 4 4 f 
                . e 5 5 4 4 f . 
                . . e 5 4 f . . 
                . . . e f . . . 
                `)
            profilelife.setEmptyLifeImage(img`
                . . . . . . . . 
                . e e . . f f . 
                e d d e f e e f 
                e d d d e e e f 
                e d d d e e e f 
                . e d d e e f . 
                . . e d e f . . 
                . . . e f . . . 
                `)
            profilelife.setMaxLife(3)
            info.setLife(3)
            Simulate_Spikes()
            music.play(music.createSong(hex`006e000408080400001c00010a006400f40164000004000000000000000000000000000500000460000000060001190600080001a12000260001192600280001a14000460001194600480001a16000660001196600680001a18000860001198600880001a1a000a6000119a600a80001a1c000c6000119c600c80001a1e000e6000119e600e80001a105001c000f0a006400f4010a00000400000000000000000000000000000000020e0100000400010d06000a00010d0c001000010d12001600010d18001c00010d1e002200010d24002800010d2a002e00010d30003400010d36003a00010d3c003e00010d40004400010d46004a00010d4c005000010d52005600010d58005c00010d5e006200010d64006800010d6a006e00010d70007400010d76007a00010d7c007e00010d80008400018e86008a00018e8c009000018e92009600018e98009c00018e9e00a000018ea000a4000190a600aa000190ac00b0000190b200b6000190b800bc000190bc00c000018ec000c400010dc600ca00010dcc00d000010dd200d600010dd800dc00010dde00e200010de400e800010dea00ee00010df000f400010df600fa00010dfc00fe00010d07001c00020a006400f401640000040000000000000000000000000000000003900008000a00011910001200011918001a00019a28002a00011930003200011938003a00019c48004a00011950005200011958005a00019a68006a00011970007200011978007a00019c88008a00019a90009200019a98009a00019aa800aa00019cb000b200019cb800ba00019ec800ca000119d000d2000119d800da00019ae800ea000119f000f2000119f800fa00019c09010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c80029010000010001040200030001041000110001041600170001041c001d0001042000210001042400250001042a002b0001042c002d0001042e002f0001043000310001043e003f0001044000410001044200430001045000510001045200530001045800590001045e005f000104680069000104700071000104760077000104780079000104800081000104880089000204068e008f0001049000910001049800990001069c009d00020406a000a1000104a800a900020406b000b1000104bc00bd00020406c000c100020406c800c900020406ca00cb000104d600d7000104d800d9000106da00db000104dc00dd000106de00df000104e600e7000104e800e900020406ea00eb000104f200f3000104f400f5000104f600f7000104f800f900020406fc00fd00020406`), music.PlaybackMode.LoopingInBackground)
        })
    } else {
        mySprite.sayText("A", 50, false)
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile89`, function (sprite, location) {
    if (controller.A.isPressed()) {
        timer.after(1, function () {
            controller.moveSprite(mySprite, 0, 0)
            tiles.setTileAt(location, assets.tile`transparency8`)
            music.stopAllSounds()
            music.play(music.createSong(hex`0078000408020109010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c8000a0000000100050405060708`), music.PlaybackMode.InBackground)
            scene.cameraShake(4, 500)
            color.startFadeFromCurrent(color.White, 1000)
            pause(5000)
            controller.moveSprite(mySprite, 70, 0)
            sprites.destroyAllSpritesOfKind(SpriteKind.Text)
            color.startFadeFromCurrent(color.originalPalette, 1000)
            PlayingLevel = 14
            tiles.setCurrentTilemap(tileUtil.createSmallMap(tilemap`level25`))
            tiles.placeOnTile(mySprite, tiles.getTileLocation(1, 13))
            textSprite2 = textsprite.create("Face me, and prove it's time to start now.", 1, 15)
            tiles.placeOnTile(textSprite2, tiles.getTileLocation(17, 7))
            profilelife.setFilledLifeImage(img`
                . . . . . . . . 
                . e e . . f f . 
                e 5 5 e f 4 4 f 
                e 5 5 5 4 4 4 f 
                e 5 5 5 4 4 4 f 
                . e 5 5 4 4 f . 
                . . e 5 4 f . . 
                . . . e f . . . 
                `)
            profilelife.setEmptyLifeImage(img`
                . . . . . . . . 
                . e e . . f f . 
                e d d e f e e f 
                e d d d e e e f 
                e d d d e e e f 
                . e d d e e f . 
                . . e d e f . . 
                . . . e f . . . 
                `)
            profilelife.setMaxLife(3)
            info.setLife(3)
            Simulate_Spikes()
            music.play(music.createSong(hex`006e000408080400001c00010a006400f40164000004000000000000000000000000000500000460000000060001190600080001a12000260001192600280001a14000460001194600480001a16000660001196600680001a18000860001198600880001a1a000a6000119a600a80001a1c000c6000119c600c80001a1e000e6000119e600e80001a105001c000f0a006400f4010a00000400000000000000000000000000000000020e0100000400010d06000a00010d0c001000010d12001600010d18001c00010d1e002200010d24002800010d2a002e00010d30003400010d36003a00010d3c003e00010d40004400010d46004a00010d4c005000010d52005600010d58005c00010d5e006200010d64006800010d6a006e00010d70007400010d76007a00010d7c007e00010d80008400018e86008a00018e8c009000018e92009600018e98009c00018e9e00a000018ea000a4000190a600aa000190ac00b0000190b200b6000190b800bc000190bc00c000018ec000c400010dc600ca00010dcc00d000010dd200d600010dd800dc00010dde00e200010de400e800010dea00ee00010df000f400010df600fa00010dfc00fe00010d07001c00020a006400f401640000040000000000000000000000000000000003900008000a00011910001200011918001a00019a28002a00011930003200011938003a00019c48004a00011950005200011958005a00019a68006a00011970007200011978007a00019c88008a00019a90009200019a98009a00019aa800aa00019cb000b200019cb800ba00019ec800ca000119d000d2000119d800da00019ae800ea000119f000f2000119f800fa00019c09010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c80029010000010001040200030001041000110001041600170001041c001d0001042000210001042400250001042a002b0001042c002d0001042e002f0001043000310001043e003f0001044000410001044200430001045000510001045200530001045800590001045e005f000104680069000104700071000104760077000104780079000104800081000104880089000204068e008f0001049000910001049800990001069c009d00020406a000a1000104a800a900020406b000b1000104bc00bd00020406c000c100020406c800c900020406ca00cb000104d600d7000104d800d9000106da00db000104dc00dd000106de00df000104e600e7000104e800e900020406ea00eb000104f200f3000104f400f5000104f600f7000104f800f900020406fc00fd00020406`), music.PlaybackMode.LoopingInBackground)
        })
    } else {
        mySprite.sayText("A", 50, false)
    }
})
sprites.onOverlap(SpriteKind.Boss2, SpriteKind.Spike, function (sprite, otherSprite) {
    scene.cameraShake(4, 500)
    characterAnimations.setCharacterAnimationsEnabled(mySprite, false)
    animation.runImageAnimation(
    mySprite,
    [img`
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        f . . . f . f . 
        f . . . f f f . 
        . f f f 1 f 1 . 
        . . f f f f f . 
        . f . . . f . f 
        `,img`
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        5 . . . 5 . 5 . 
        5 . . . 5 5 5 . 
        . 5 5 5 4 5 4 . 
        . . 5 5 5 5 5 . 
        . 5 . . . 5 . 5 
        `],
    50,
    true
    )
    music.play(music.createSoundEffect(
    WaveShape.Noise,
    2471,
    2313,
    600,
    0,
    200,
    SoundExpressionEffect.Vibrato,
    InterpolationCurve.Logarithmic
    ), music.PlaybackMode.InBackground)
    info.changeLifeBy(-1)
    mySprite.vy = 0
    mySprite.vy += -100
    mySprite.setFlag(SpriteFlag.GhostThroughSprites, true)
    mySprite3.setFlag(SpriteFlag.GhostThroughSprites, true)
    timer.after(1000, function () {
        animation.stopAnimation(animation.AnimationTypes.All, mySprite)
        mySprite.setFlag(SpriteFlag.GhostThroughSprites, false)
        mySprite3.setFlag(SpriteFlag.GhostThroughSprites, false)
        characterAnimations.setCharacterAnimationsEnabled(mySprite, true)
    })
})
function Menu () {
    Perfects = 0
    color.startFade(color.White, color.originalPalette, 1000)
    profilelife.setFilledLifeImage(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    profilelife.setEmptyLifeImage(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    scene.setBackgroundImage(img`
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        `)
    tiles.setCurrentTilemap(tileUtil.createSmallMap(tilemap`level4`))
    textSprite = textsprite.create("HEBES", 1, 15)
    textSprite.changeScale(1.2, ScaleAnchor.Middle)
    textSprite.setPosition(44, 23)
    animation.runMovementAnimation(
    textSprite,
    animation.animationPresets(animation.bobbing),
    2000,
    true
    )
    music.play(music.createSong(hex`0050000408080500001c00010a006400f401640000040000000000000000000000000005000004480000001000010d10002000011120003000010f40005000011450006000010d60007000010f80009000010d9000a0000111a000b000010fc000d0000114d000e000010de000f000010f03001c0001dc00690000045e01000400000000000000000000056400010400034c0000001000011910002800011d28004000011b400050000219205000680002191d68008000011b8000900001199000a800011da800c000011bc000d000021920d000e80002191de8000001011b05001c000f0a006400f4010a0000040000000000000000000000000000000002480000000400011910001400011620002400011440004400011950005400011d600064000120800084000119900094000116a000a4000114c000c4000120d000d4000122e000e400012007001c00020a006400f4016400000400000000000000000000000000000000036c0000000400011910001400011d20002400011b24002800011d2c003000011d40004400012050005400011958005c00012064006800011b80008400011990009400011da000a400011ba400a800011dac00b000011dc000c4000120d000d4000119d800dc000120e400e800011b09010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c80000010000010001000200030001001600170001002000210001002c002d0001003000310001003400350001003800390001004000410001004200430001004e004f0001005800590001006800690001006c006d00010070007100010074007500010080008100020006820083000200068e008f00020006900091000107940095000106980099000100a600a7000106a800a9000106aa00ab000106ac00ad00020007b000b1000100b400b5000100b800b9000100c000c100020006c200c300020006ce00cf00020006d400d5000107d800d900020006dc00dd000107e800e900020006ec00ed0003000607f000f100020006f400f50003000607fc00fd0003000607`), music.PlaybackMode.LoopingInBackground)
    mySprite = sprites.create(img`
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        f . . . f . f . 
        f . . . f f f . 
        . f f f 1 f 1 . 
        . . f f f f f . 
        . . f . f . f . 
        `, SpriteKind.Player)
    mySprite.ay = 180
    controller.moveSprite(mySprite, 70, 0)
    tiles.placeOnTile(mySprite, tiles.getTileLocation(2, 13))
    scene.cameraFollowSprite(mySprite)
    if (Level15Done >= 1) {
        mySprite5.setFlag(SpriteFlag.Invisible, false)
    }
    tileUtil.coverAllTiles(assets.tile`myTile2`, assets.tile`myTile3`)
    tileUtil.coverAllTiles(assets.tile`myTile26`, assets.tile`myTile3`)
    tileUtil.coverAllTiles(assets.tile`myTile27`, assets.tile`myTile3`)
    tileUtil.coverAllTiles(assets.tile`myTile28`, assets.tile`myTile3`)
    tileUtil.coverAllTiles(assets.tile`myTile29`, assets.tile`myTile4`)
    tileUtil.coverAllTiles(assets.tile`myTile30`, assets.tile`myTile3`)
    tileUtil.coverAllTiles(assets.tile`myTile31`, assets.tile`myTile3`)
    tileUtil.coverAllTiles(assets.tile`myTile32`, assets.tile`myTile5`)
    tileUtil.coverAllTiles(assets.tile`myTile33`, assets.tile`myTile3`)
    tileUtil.coverAllTiles(assets.tile`myTile34`, assets.tile`myTile4`)
    tileUtil.coverAllTiles(assets.tile`myTile86`, assets.tile`myTile3`)
    tileUtil.coverAllTiles(assets.tile`myTile87`, assets.tile`myTile3`)
    tileUtil.coverAllTiles(assets.tile`myTile88`, assets.tile`myTile3`)
    tileUtil.coverAllTiles(assets.tile`myTile89`, assets.tile`myTile3`)
    tileUtil.coverAllTiles(assets.tile`myTile90`, assets.tile`myTile4`)
    tileUtil.coverAllTiles(assets.tile`myTile91`, assets.tile`myTile3`)
    tileUtil.coverAllTiles(assets.tile`myTile92`, assets.tile`myTile5`)
    tileUtil.coverAllTiles(assets.tile`myTile93`, assets.tile`myTile3`)
    tileUtil.coverAllTiles(assets.tile`myTile94`, assets.tile`myTile3`)
    tileUtil.coverAllTiles(assets.tile`myTile95`, assets.tile`myTile4`)
    GameStart = 1
    if (Phase == 2) {
        Phase = 1
    }
    if (Level1Done == 1) {
        tileUtil.coverAllTiles(assets.tile`myTile2`, assets.tile`myTile18`)
    } else {
        if (Level1Done == 2) {
            tileUtil.coverAllTiles(assets.tile`myTile2`, assets.tile`myTile49`)
            Perfects += 1
        }
    }
    if (Level2Done == 1) {
        tileUtil.coverAllTiles(assets.tile`myTile26`, assets.tile`myTile18`)
    } else {
        if (Level2Done == 2) {
            tileUtil.coverAllTiles(assets.tile`myTile26`, assets.tile`myTile49`)
            Perfects += 1
        }
    }
    if (Level3Done == 1) {
        tileUtil.coverAllTiles(assets.tile`myTile27`, assets.tile`myTile18`)
    } else {
        if (Level3Done == 2) {
            tileUtil.coverAllTiles(assets.tile`myTile27`, assets.tile`myTile49`)
            Perfects += 1
        }
    }
    if (Level6Done == 1) {
        tileUtil.coverAllTiles(assets.tile`myTile30`, assets.tile`myTile18`)
    } else {
        if (Level6Done == 2) {
            tileUtil.coverAllTiles(assets.tile`myTile30`, assets.tile`myTile49`)
            Perfects += 1
        }
    }
    if (Level7Done == 1) {
        tileUtil.coverAllTiles(assets.tile`myTile31`, assets.tile`myTile18`)
    } else {
        if (Level7Done == 2) {
            tileUtil.coverAllTiles(assets.tile`myTile31`, assets.tile`myTile49`)
            Perfects += 1
        }
    }
    if (Level9Done == 1) {
        tileUtil.coverAllTiles(assets.tile`myTile33`, assets.tile`myTile18`)
    } else {
        if (Level9Done == 2) {
            tileUtil.coverAllTiles(assets.tile`myTile33`, assets.tile`myTile49`)
            Perfects += 1
        }
    }
    if (Level8Done == 1) {
        tileUtil.coverAllTiles(assets.tile`myTile32`, assets.tile`myTile75`)
    } else {
        if (Level8Done == 2) {
            tileUtil.coverAllTiles(assets.tile`myTile32`, assets.tile`myTile76`)
            Perfects += 1
        }
    }
    if (Level11Done == 1) {
        tileUtil.coverAllTiles(assets.tile`myTile86`, assets.tile`myTile18`)
    } else {
        if (Level11Done == 2) {
            tileUtil.coverAllTiles(assets.tile`myTile86`, assets.tile`myTile49`)
            Perfects += 1
        }
    }
    if (Level14Done == 1) {
        tileUtil.coverAllTiles(assets.tile`myTile89`, assets.tile`myTile18`)
    } else {
        if (Level14Done == 2) {
            tileUtil.coverAllTiles(assets.tile`myTile89`, assets.tile`myTile49`)
            Perfects += 1
        }
    }
    if (Level13Done == 1) {
        tileUtil.coverAllTiles(assets.tile`myTile88`, assets.tile`myTile18`)
    } else {
        if (Level13Done == 2) {
            tileUtil.coverAllTiles(assets.tile`myTile88`, assets.tile`myTile49`)
            Perfects += 1
        }
    }
    if (Level12Done == 1) {
        tileUtil.coverAllTiles(assets.tile`myTile87`, assets.tile`myTile18`)
    } else {
        if (Level12Done == 2) {
            tileUtil.coverAllTiles(assets.tile`myTile87`, assets.tile`myTile49`)
            Perfects += 1
        }
    }
    if (Level4Done == 1) {
        tileUtil.coverAllTiles(assets.tile`myTile28`, assets.tile`myTile18`)
    } else {
        if (Level4Done == 2) {
            tileUtil.coverAllTiles(assets.tile`myTile28`, assets.tile`myTile49`)
            Perfects += 1
        }
    }
    if (Level5Done == 1) {
        tileUtil.coverAllTiles(assets.tile`myTile29`, assets.tile`myTile55`)
    } else {
        if (Level5Done == 2) {
            tileUtil.coverAllTiles(assets.tile`myTile29`, assets.tile`myTile56`)
            Perfects += 1
        }
    }
    if (Level10Done == 1) {
        tileUtil.coverAllTiles(assets.tile`myTile34`, assets.tile`myTile55`)
    } else {
        if (Level10Done == 2) {
            tileUtil.coverAllTiles(assets.tile`myTile34`, assets.tile`myTile56`)
            Perfects += 1
        }
    }
    if (Level15Done == 1) {
        tileUtil.coverAllTiles(assets.tile`myTile90`, assets.tile`myTile55`)
    } else {
        if (Level15Done == 2) {
            tileUtil.coverAllTiles(assets.tile`myTile90`, assets.tile`myTile56`)
            Perfects += 1
        }
    }
    if (Level10Done >= 1) {
        tiles.setTileAt(tiles.getTileLocation(19, 6), assets.tile`myTile79`)
        tiles.setTileAt(tiles.getTileLocation(20, 6), assets.tile`myTile21`)
        tiles.setTileAt(tiles.getTileLocation(21, 6), assets.tile`myTile80`)
        tiles.setTileAt(tiles.getTileLocation(20, 7), assets.tile`myTile81`)
        tiles.setTileAt(tiles.getTileLocation(24, 6), assets.tile`myTile14`)
        tiles.setTileAt(tiles.getTileLocation(23, 7), assets.tile`myTile82`)
        tiles.setTileAt(tiles.getTileLocation(24, 7), assets.tile`myTile83`)
        tiles.setTileAt(tiles.getTileLocation(25, 7), assets.tile`myTile84`)
    }
    if (Level15Done >= 1) {
        tiles.setTileAt(tiles.getTileLocation(27, 6), assets.tile`myTile107`)
        tiles.setTileAt(tiles.getTileLocation(28, 6), assets.tile`myTile110`)
        tiles.setTileAt(tiles.getTileLocation(29, 6), assets.tile`myTile111`)
        tiles.setTileAt(tiles.getTileLocation(28, 7), assets.tile`myTile108`)
        tiles.setTileAt(tiles.getTileLocation(32, 6), assets.tile`myTile112`)
        tiles.setTileAt(tiles.getTileLocation(31, 7), assets.tile`myTile113`)
        tiles.setTileAt(tiles.getTileLocation(32, 7), assets.tile`myTile114`)
        tiles.setTileAt(tiles.getTileLocation(33, 7), assets.tile`myTile115`)
    }
    if (Level5Done >= 1) {
        tiles.setTileAt(tiles.getTileLocation(15, 6), assets.tile`myTile23`)
        tiles.setTileAt(tiles.getTileLocation(16, 6), assets.tile`myTile21`)
        tiles.setTileAt(tiles.getTileLocation(17, 6), assets.tile`myTile23`)
        tiles.setTileAt(tiles.getTileLocation(16, 7), assets.tile`myTile57`)
    }
    Skin2()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile31`, function (sprite, location) {
    if (controller.A.isPressed()) {
        timer.after(1, function () {
            controller.moveSprite(mySprite, 0, 0)
            tiles.setTileAt(location, assets.tile`transparency8`)
            music.stopAllSounds()
            music.play(music.createSong(hex`0078000408020109010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c8000a0000000100050405060708`), music.PlaybackMode.InBackground)
            scene.cameraShake(4, 500)
            color.startFadeFromCurrent(color.White, 1000)
            pause(5000)
            controller.moveSprite(mySprite, 70, 0)
            sprites.destroyAllSpritesOfKind(SpriteKind.Text)
            color.startFadeFromCurrent(color.originalPalette, 1000)
            PlayingLevel = 7
            tiles.setCurrentTilemap(tileUtil.createSmallMap(tilemap`level17`))
            tiles.placeOnTile(mySprite, tiles.getTileLocation(1, 13))
            textSprite2 = textsprite.create("People have it worse, so just give it up.", 1, 15)
            tiles.placeOnTile(textSprite2, tiles.getTileLocation(17, 7))
            profilelife.setFilledLifeImage(img`
                . . . . . . . . 
                . e e . . f f . 
                e 5 5 e f 4 4 f 
                e 5 5 5 4 4 4 f 
                e 5 5 5 4 4 4 f 
                . e 5 5 4 4 f . 
                . . e 5 4 f . . 
                . . . e f . . . 
                `)
            profilelife.setEmptyLifeImage(img`
                . . . . . . . . 
                . e e . . f f . 
                e d d e f e e f 
                e d d d e e e f 
                e d d d e e e f 
                . e d d e e f . 
                . . e d e f . . 
                . . . e f . . . 
                `)
            profilelife.setMaxLife(3)
            info.setLife(3)
            Simulate_Spikes()
            music.play(music.createSong(hex`005a000408080400001c00010a006400f401640000040000000000000000000000000005000004000300000200011802000400019a04000600011b06000800019f08000a0001240a000c0001180c000e00019a0e001000011b10001200019f12001400012414001600011816001800019a18001a00011b1a001c00019f1c001e0001241e002000011b20002200011d22002400019f24002600012226002800012728002a00011b2a002c00011d2c002e00019f2e003000012230003200012732003400019a34003600011b36003800019f38003a0001243a003c00019f3c003e00011b3e004000019740004200011842004400019a44004600011b46004800019f48004a0001244a004c0001184c004e00019a4e005000011b50005200019f52005400012454005600011856005800019a58005a00011b5a005c00019f5c005e0001245e006000011b60006200011d62006400019f64006600012266006800012768006a00011b6a006c00011d6c006e00019f6e007000012270007200012772007400019a74007600011b76007800019f78007a0001247a007c00019f7c007e00011b7e008000019780008200011882008400019a84008600011b86008800019f88008a0001248a008c0001188c008e00019a8e009000011b90009200019f92009400012494009600011896009800019a98009a00011b9a009c00019f9c009e0001249e00a000011ba000a200011da200a400019fa400a6000122a600a8000127a800aa00011baa00ac00011dac00ae00019fae00b0000122b000b2000127b200b400019ab400b600011bb600b800019fb800ba000124ba00bc00019fbc00be00011bbe00c0000197c000c2000118c200c400019ac400c600011bc600c800019fc800ca000124ca00cc000118cc00ce00019ace00d000011bd000d200019fd200d4000124d400d6000118d600d800019ad800da00011bda00dc00019fdc00de000124de00e000011be000e200011de200e400019fe400e6000122e600e8000127e800ea00011bea00ec00011dec00ee00019fee00f0000122f000f2000127f200f400019af400f600011bf600f800019ff800fa000124fa00fc00019ffc00fe00011bfe000001019703001c0001dc00690000045e01000400000000000000000000056400010400031e008000a0000118a000c000011bc000e0000118e000f000011df0000001019f07001c00020a006400f401640000040000000000000000000000000000000003a20000000400011806000800011820002400011b26002800011b40004400011846004800011860006400011b66006800011b70007400011d76007800011d78007c00019f800084000118860088000118a000a400011ba600a800011bb000b4000118b600b8000118b800bc000197be00c0000197c000c4000118c600c8000118e000e400011be600e800011bf000f400011df600f800011df800fc00019ffe00000101a309010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c80011010000010001030e000f0001031000110001031400150001032800290001032a002b0001033800390001033e003f0001034000410001034e004f0001035000510001035400550001036600670001036800690001036a006b0001036c006d0001037200730001037800790001037e007f0001038000810001038800890001068e008f000103900091000103940095000103980099000106a800a900020306aa00ab000103b800b900020306be00bf000103c000c1000103c600c7000103c800c900020306cc00cd000103d800d900020306e000e100020306e600e7000103e800e900020306ee00ef000103f000f1000106f400f500020306f800f9000106fa00fb00020306fc00fd000106fe00ff00020306`), music.PlaybackMode.LoopingInBackground)
        })
    } else {
        mySprite.sayText("A", 50, false)
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile27`, function (sprite, location) {
    if (controller.A.isPressed()) {
        timer.after(1, function () {
            controller.moveSprite(mySprite, 0, 0)
            tiles.setTileAt(location, assets.tile`transparency8`)
            music.stopAllSounds()
            music.play(music.createSong(hex`0078000408020109010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c8000a0000000100050405060708`), music.PlaybackMode.InBackground)
            scene.cameraShake(4, 500)
            color.startFadeFromCurrent(color.White, 1000)
            pause(5000)
            controller.moveSprite(mySprite, 70, 0)
            sprites.destroyAllSpritesOfKind(SpriteKind.Text)
            color.startFadeFromCurrent(color.originalPalette, 1000)
            PlayingLevel = 3
            tiles.setCurrentTilemap(tileUtil.createSmallMap(tilemap`level11`))
            tiles.placeOnTile(mySprite, tiles.getTileLocation(1, 13))
            textSprite2 = textsprite.create("Even if you got close, you don't deserve it.", 1, 15)
            tiles.placeOnTile(textSprite2, tiles.getTileLocation(18, 7))
            profilelife.setFilledLifeImage(img`
                . . . . . . . . 
                . e e . . f f . 
                e 5 5 e f 4 4 f 
                e 5 5 5 4 4 4 f 
                e 5 5 5 4 4 4 f 
                . e 5 5 4 4 f . 
                . . e 5 4 f . . 
                . . . e f . . . 
                `)
            profilelife.setEmptyLifeImage(img`
                . . . . . . . . 
                . e e . . f f . 
                e d d e f e e f 
                e d d d e e e f 
                e d d d e e e f 
                . e d d e e f . 
                . . e d e f . . 
                . . . e f . . . 
                `)
            profilelife.setMaxLife(3)
            info.setLife(3)
            Simulate_Spikes()
            music.play(music.createSong(hex`005a0004080c0300001c00010a006400f401640000040000000000000000000000000005000004360200000400011804000800021b9f08000c0001180c001000021b9f10001400011814001800021b9f18001c00011b1c002000021b9f20002400011d24002800021d2028002c00011d2c003000021d2030003400011d34003800021d2038003c00011d3c004000021d2040004400011d44004800021d2248004c00011d4c005000021d2250005400011b54005800021d2258005c00019a5c006000021d2260006400011864006800029f2468006c0001186c007000029f2470007400011874007800029f2478007c0001187c008000029f2480008400011884008800021b9f88008c0001188c009000021b9f90009400011894009800021b9f98009c00011b9c00a000021b9fa000a400011da400a800021d20a800ac00011dac00b000021d20b000b400011db400b800021d20b800bc00011dbc00c000021d20c000c400011dc400c800021d22c800cc00011dcc00d000021d22d000d400011bd400d800021d22d800dc00019adc00e000021d22e000e4000118e400e800029f24e800ec000118ec00f000029f24f000f4000118f400f800029f24f800fc000118fc000001029f2400010401011804010801019f08010c01011b10011401011814011801019f18011c01011b20012401011824012801019f28012c01011b30013401011d34013801012038013c01011d40014401011d44014801012048014c01011d50015401011d54015801012058015c01011d60016401011d64016801012068016c01012270017401012274017801012078017c0101227c018001012407001c00020a006400f401640000040000000000000000000000000000000003d80008000c00012410001400012718001c0001ab20002400012948004c00012450005400012758005c0001a660006400012488008c00012490009400012798009c0001aba000a4000129c800cc000129d000d4000127d800dc0001a6e000e400012408010c01012410011401012718011c0101ab20012401012928012c01012430013401012738013c0101ab3c014001012c40014401012948014c0101244e015001012450015401012758015c0101a660016401012468016c0101226c01700101247001740101a674017801012478017c0101227c018001012409010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c8003a010000010001031000110001061200130001061c001d0001052000210001033000310001063200330001063c003d00020305400041000103500051000103580059000203065a005b000106600061000103700071000106720073000106760077000106780079000106800081000103900091000106920093000106a000a1000103b000b1000106b200b3000106bc00bd00020305c000c1000103d000d100020306d200d3000106d800d9000103e000e1000103f000f1000106f200f3000106f600f7000106f800f900010600010101010308010901020306100111010303040718011901020306200121010103280129010203063001310103030407380139010203064001410101034801490102030650015101030304075801590102030660016101010368016901020306700171010303040778017901020306`), music.PlaybackMode.LoopingInBackground)
        })
    } else {
        mySprite.sayText("A", 50, false)
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile99`, function (sprite, location) {
    if (controller.A.isPressed()) {
        timer.after(1, function () {
            tiles.setTileAt(location, assets.tile`transparency8`)
            sprites.destroyAllSpritesOfKind(SpriteKind.Spike)
            sprites.destroyAllSpritesOfKind(SpriteKind.Setup)
            sprites.destroyAllSpritesOfKind(SpriteKind.Nothing)
            sprites.destroyAllSpritesOfKind(SpriteKind.Text)
            sprites.destroyAllSpritesOfKind(SpriteKind.Saw)
            sprites.destroyAllSpritesOfKind(SpriteKind.Spout)
            sprites.destroyAllSpritesOfKind(SpriteKind.Scorchup)
            sprites.destroyAllSpritesOfKind(SpriteKind.Cacti)
            sprites.destroyAllSpritesOfKind(SpriteKind.Blurt)
            sprites.destroyAllSpritesOfKind(SpriteKind.BuzzSaw)
            sprites.destroyAllSpritesOfKind(SpriteKind.Hover)
            GameStart = 0
            sprites.destroyAllSpritesOfKind(SpriteKind.Player)
            music.stopAllSounds()
            music.play(music.createSong(hex`005a000408020103001c0001dc00690000045e0100040000000000000000000005640001040003080000002000030d9014`), music.PlaybackMode.InBackground)
            scene.cameraShake(4, 500)
            color.startFadeFromCurrent(color.White, 1000)
            pause(5000)
            Menu()
            PlayingLevel = 0
        })
    } else {
        mySprite.sayText("A", 50, false)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Setup, function (sprite, otherSprite) {
    otherSprite.setKind(SpriteKind.Nothing)
    timer.after(500, function () {
        extraEffects.createSpreadEffectOnAnchor(otherSprite, extraEffects.createSingleColorSpreadEffectData(5, ExtraEffectPresetShape.Spark), 100)
        otherSprite.setKind(SpriteKind.Spike)
        otherSprite.setImage(img`
            . . . . . . . . 
            . . . 5 5 . . . 
            . . . 5 5 . . . 
            . . 5 4 4 5 . . 
            . . 5 4 4 5 . . 
            . 5 4 f f 4 5 . 
            . 5 4 f f 4 5 . 
            5 4 f f f f 4 5 
            `)
        music.play(music.createSong(hex`0078000408020109010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c8000600000001000113`), music.PlaybackMode.InBackground)
        timer.after(500, function () {
            otherSprite.setKind(SpriteKind.Setup)
            otherSprite.setImage(img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . 5 5 . . . 
                . . . 5 5 . . . 
                . . 5 4 4 5 . . 
                `)
        })
    })
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile51`, function (sprite, location) {
    if (controller.A.isPressed()) {
        timer.after(1, function () {
            tiles.setTileAt(location, assets.tile`transparency8`)
            extraEffects.createSpreadEffectOnAnchor(mySprite, extraEffects.createSingleColorSpreadEffectData(9, ExtraEffectPresetShape.Spark), 5000, 100)
            tileUtil.replaceAllTiles(assets.tile`myTile51`, assets.tile`transparency8`)
            sprites.destroyAllSpritesOfKind(SpriteKind.Spike)
            sprites.destroyAllSpritesOfKind(SpriteKind.Setup)
            sprites.destroyAllSpritesOfKind(SpriteKind.Text)
            sprites.destroyAllSpritesOfKind(SpriteKind.Saw)
            sprites.destroyAllSpritesOfKind(SpriteKind.Hover)
            sprites.destroyAllSpritesOfKind(SpriteKind.Nothing)
            sprites.destroyAllSpritesOfKind(SpriteKind.Spout)
            GameStart = 0
            music.stopAllSounds()
            if (PlayingLevel == 5) {
                mySprite3.setImage(img`
                    ..ddddddddddddddddd..
                    .ddddddddddddddddddd.
                    ddddcccdddddddcccdddd
                    dddcfffccdddccfffcddd
                    dddfeeeffcdcffeeefddd
                    dddeeeeeefcfeeeeeeddd
                    ddde111eefcfee111eddd
                    ddd11111edcde11111ddd
                    ddde111edfcfde111eddd
                    edddeeeddfdfddeeeddde
                    ddddddddfdcdfdddddddd
                    edddccfdffdffdfccddde
                    edfcccffefffeffcccfde
                    edfccceeeeeeeeecccfde
                    edfccddeeeeeeeddccfde
                    edefdddd11111ddddfede
                    edeeefdd11111ddfeeede
                    eedeefd1111111dfeedee
                    .eedddf1111111fdddee.
                    ..eeeeefeeeeefeeeee..
                    `)
                mySprite3.setKind(SpriteKind.Nothing)
                mySprite3.vx = 0
                animation.runImageAnimation(
                mySprite3,
                [img`
                    ..ddddddddddddddddd..
                    .ddddddddddddddddddd.
                    ddddcccdddddddcccdddd
                    dddcfffccdddccfffcddd
                    dddfeeeffcdcffeeefddd
                    dddeeeeeefcfeeeeeeddd
                    ddde111eefcfee111eddd
                    ddd11111edcde11111ddd
                    ddde111edfcfde111eddd
                    edddeeeddfdfddeeeddde
                    ddddddddfdcdfdddddddd
                    edddccfdffdffdfccddde
                    edfcccffefffeffcccfde
                    edfccceeeeeeeeecccfde
                    edfccddeeeeeeeddccfde
                    edefdddd11111ddddfede
                    edeeefdd11111ddfeeede
                    eedeefd1111111dfeedee
                    .eedddf1111111fdddee.
                    ..eeeeefeeeeefeeeee..
                    `,img`
                    ..bbbbbbbbbbbbbbbbb..
                    .bbbbbbbbbbbbbbbbbbb.
                    bbbbaaabbbbbbbaaabbbb
                    bbbadddaabbbaadddabbb
                    bbbdcccddabaddcccdbbb
                    bbbccccccdadccccccbbb
                    bbbc111ccdadcc111cbbb
                    bbb11111cbabc11111bbb
                    bbbc111cbdadbc111cbbb
                    cbbbcccbbdbdbbcccbbbc
                    bbbbbbbbdbabdbbbbbbbb
                    cbbbaadbddbddbdaabbbc
                    cbdaaaddcdddcddaaadbc
                    cbdaaacccccccccaaadbc
                    cbdaabbcccccccbbaadbc
                    cbcdbbbb11111bbbbdcbc
                    cbcccdbb11111bbdcccbc
                    ccbccdb1111111bdccbcc
                    .ccbbbd1111111dbbbcc.
                    ..cccccdcccccdccccc..
                    `],
                75,
                true
                )
            }
            if (PlayingLevel == 10) {
                mySprite3.setImage(img`
                    . 4 . . . . 4 . 
                    . 4 4 . . 4 4 . 
                    . 4 4 4 1 1 1 . 
                    . 4 1 4 1 1 1 . 
                    . 4 4 4 1 1 1 . 
                    . 4 . 4 . 4 . . 
                    . . 4 . 4 . 4 . 
                    . 4 4 4 4 4 4 . 
                    `)
                mySprite3.setKind(SpriteKind.Nothing)
                mySprite3.vx = 0
                characterAnimations.setCharacterAnimationsEnabled(mySprite3, false)
                animation.runImageAnimation(
                mySprite3,
                [img`
                    . 4 . . . . 4 . 
                    . 4 4 . . 4 4 . 
                    . 4 1 4 1 1 1 . 
                    . 1 1 1 1 1 1 . 
                    . 4 1 4 1 1 1 . 
                    . 4 . 4 . 4 . . 
                    . . 4 . 4 . 4 . 
                    . 4 4 4 4 4 4 . 
                    `,img`
                    . 5 . . . . 5 . 
                    . 5 5 . . 5 5 . 
                    . 1 1 1 5 1 5 . 
                    . 1 1 1 1 1 1 . 
                    . 1 1 1 5 1 5 . 
                    . 5 . 5 . 5 . . 
                    . . 5 . 5 . 5 . 
                    . 5 5 5 5 5 5 . 
                    `],
                75,
                true
                )
            }
            if (PlayingLevel == 15) {
                mySprite3.setKind(SpriteKind.Nothing)
                mySprite3.vx = 0
                animation.runImageAnimation(
                mySprite3,
                [img`
                    .....fffffffffff.....
                    ....fffffffffffff....
                    ...fffffffffffffff...
                    ..fffffffb1bfffffff..
                    .ffffffa1fffabffffff.
                    fffffdb1fffff1bdfffff
                    f5ffeb11fffff11beffff
                    f5ff4db1fffff1bd4ff5f
                    f5fff44bafff1a44fff5f
                    f45ff4f44b1b44f4fff5f
                    f45ffff4f4444fffff54f
                    f445ffffff4fffffff54f
                    ff45ffffffff5ffff544f
                    ff445fff5ff545fff54ff
                    ff4f45f545544f5f54fff
                    ffff4f5f444f4ff5f4f4f
                    ffffffff4f4ffffffffff
                    fff.f.fff.ff4ffff.fff
                    ff.....f...fff.f...ff
                    f...........f.......f
                    `,img`
                    .....eeeeeeeeeee.....
                    ....eeeeeeeeeeeee....
                    ...eeeeeeeeeeeeeee...
                    ..eeeeeeea1aeeeeeee..
                    .eeeeee915559aeeeeee.
                    eeeeeba1555551abeeeee
                    e9eeda115555511adeeee
                    e9ee5ba1555551ab5ee9e
                    e9eee55a95551955eee9e
                    e59ee5e55a1a55e5eee9e
                    e59eeee5e5555eeeee95e
                    e559eeeeee5eeeeeee95e
                    ee59eeeeeeee9eeee955e
                    ee559eee9ee959eee95ee
                    ee5e59e959955e9e95eee
                    eeee5e9e555e5ee9e5e5e
                    eeeeeeee5e5eeeeeeeeee
                    eee.e.eee.ee5eeee.eee
                    ee.....e...eee.e...ee
                    e...........e.......e
                    `],
                100,
                true
                )
            }
            music.play(music.createSong(hex`005a000408020103001c0001dc00690000045e010004000000000000000000000564000104000308000000200003191d20`), music.PlaybackMode.InBackground)
            scene.cameraShake(4, 500)
            color.startFadeFromCurrent(color.White, 1000)
            pause(5000)
            if (PlayingLevel == 5) {
                if (Level5Done == 0) {
                    Level5Done = 1
                    ExtraJump = 1
                }
                if (info.life() == 3) {
                    Level5Done = 2
                }
            }
            if (PlayingLevel == 10) {
                if (Level10Done == 0) {
                    Level10Done = 1
                    Phase = 1
                }
                if (info.life() == 3) {
                    Level10Done = 2
                }
            }
            if (PlayingLevel == 15) {
                if (Level15Done == 0) {
                    Level15Done = 1
                    Orb = 1
                }
                if (info.life() == 3) {
                    Level15Done = 2
                }
            }
            sprites.destroyAllSpritesOfKind(SpriteKind.Player)
            sprites.destroyAllSpritesOfKind(SpriteKind.Nothing)
            Menu()
            PlayingLevel = 0
        })
    } else {
        mySprite.sayText("A", 50, false)
    }
})
function AddCycle () {
    if (Orb == 1.5) {
        CycleLevel += 1
        if (CycleLevel == 1) {
            mySprite5.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . d d d 3 3 3 . . . . . 
                . . . . d d d d 3 3 3 3 . . . . 
                . . . d d d d d 3 3 3 3 d . . . 
                . . d d d d d d 3 3 3 d d d . . 
                . . d d d d d d 3 3 d d d d . . 
                . . d d d d d f f d d d d d . . 
                . . d d d d d f f d d d d d . . 
                . . d d d d d d d d d d d d . . 
                . . d d d d d d d d d d d d . . 
                . . e d d d d d d d d d d e . . 
                . . . e d d d d d d d d e . . . 
                . . . . e d d d d d d e . . . . 
                . . . . . e e e e e e . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
        } else {
            if (CycleLevel == 2) {
                mySprite5.setImage(img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . d d d 3 3 3 . . . . . 
                    . . . . d d d d 3 3 3 3 . . . . 
                    . . . d d d d d 3 3 3 3 3 . . . 
                    . . d d d d d d 3 3 3 3 3 3 . . 
                    . . d d d d d d 3 3 3 3 3 3 . . 
                    . . d d d d d f f 3 3 3 3 3 . . 
                    . . d d d d d f f d d d d d . . 
                    . . d d d d d d d d d d d d . . 
                    . . d d d d d d d d d d d d . . 
                    . . e d d d d d d d d d d e . . 
                    . . . e d d d d d d d d e . . . 
                    . . . . e d d d d d d e . . . . 
                    . . . . . e e e e e e . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `)
            } else {
                if (CycleLevel == 3) {
                    mySprite5.setImage(img`
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . d d d 3 3 3 . . . . . 
                        . . . . d d d d 3 3 3 3 . . . . 
                        . . . d d d d d 3 3 3 3 3 . . . 
                        . . d d d d d d 3 3 3 3 3 3 . . 
                        . . d d d d d d 3 3 3 3 3 3 . . 
                        . . d d d d d f f 3 3 3 3 3 . . 
                        . . d d d d d f f 3 3 3 3 3 . . 
                        . . d d d d d d d 3 3 3 3 3 . . 
                        . . d d d d d d d d 3 3 3 3 . . 
                        . . e d d d d d d d d 3 3 2 . . 
                        . . . e d d d d d d d d 2 . . . 
                        . . . . e d d d d d d e . . . . 
                        . . . . . e e e e e e . . . . . 
                        . . . . . . . . . . . . . . . . 
                        `)
                } else {
                    if (CycleLevel == 4) {
                        mySprite5.setImage(img`
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . d d d 3 3 3 . . . . . 
                            . . . . d d d d 3 3 3 3 . . . . 
                            . . . d d d d d 3 3 3 3 3 . . . 
                            . . d d d d d d 3 3 3 3 3 3 . . 
                            . . d d d d d d 3 3 3 3 3 3 . . 
                            . . d d d d d f f 3 3 3 3 3 . . 
                            . . d d d d d f f 3 3 3 3 3 . . 
                            . . d d d d d d 3 3 3 3 3 3 . . 
                            . . d d d d d d 3 3 3 3 3 3 . . 
                            . . e d d d d d 3 3 3 3 3 2 . . 
                            . . . e d d d d 3 3 3 3 2 . . . 
                            . . . . e d d d 3 3 3 2 . . . . 
                            . . . . . e e e 2 2 2 . . . . . 
                            . . . . . . . . . . . . . . . . 
                            `)
                    } else {
                        if (CycleLevel == 5) {
                            mySprite5.setImage(img`
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . d d d 3 3 3 . . . . . 
                                . . . . d d d d 3 3 3 3 . . . . 
                                . . . d d d d d 3 3 3 3 3 . . . 
                                . . d d d d d d 3 3 3 3 3 3 . . 
                                . . d d d d d d 3 3 3 3 3 3 . . 
                                . . d d d d d f f 3 3 3 3 3 . . 
                                . . d d d d d f f 3 3 3 3 3 . . 
                                . . d d d d 3 3 3 3 3 3 3 3 . . 
                                . . d d d 3 3 3 3 3 3 3 3 3 . . 
                                . . e d 3 3 3 3 3 3 3 3 3 2 . . 
                                . . . e 3 3 3 3 3 3 3 3 2 . . . 
                                . . . . 2 3 3 3 3 3 3 2 . . . . 
                                . . . . . 2 2 2 2 2 2 . . . . . 
                                . . . . . . . . . . . . . . . . 
                                `)
                        } else {
                            if (CycleLevel == 6) {
                                mySprite5.setImage(img`
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . d d d 3 3 3 . . . . . 
                                    . . . . d d d d 3 3 3 3 . . . . 
                                    . . . d d d d d 3 3 3 3 3 . . . 
                                    . . d d d d d d 3 3 3 3 3 3 . . 
                                    . . d d d d d d 3 3 3 3 3 3 . . 
                                    . . d d d d d f f 3 3 3 3 3 . . 
                                    . . 3 3 3 3 3 f f 3 3 3 3 3 . . 
                                    . . 3 3 3 3 3 3 3 3 3 3 3 3 . . 
                                    . . 3 3 3 3 3 3 3 3 3 3 3 3 . . 
                                    . . 2 3 3 3 3 3 3 3 3 3 3 2 . . 
                                    . . . 2 3 3 3 3 3 3 3 3 2 . . . 
                                    . . . . 2 3 3 3 3 3 3 2 . . . . 
                                    . . . . . 2 2 2 2 2 2 . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    `)
                            } else {
                                if (CycleLevel == 7) {
                                    mySprite5.setImage(img`
                                        . . . . . . . . . . . . . . . . 
                                        . . . . . . . . . . . . . . . . 
                                        . . . . . d d d 3 3 3 . . . . . 
                                        . . . . d d d d 3 3 3 3 . . . . 
                                        . . . 3 3 d d d 3 3 3 3 3 . . . 
                                        . . 3 3 3 3 d d 3 3 3 3 3 3 . . 
                                        . . 3 3 3 3 3 d 3 3 3 3 3 3 . . 
                                        . . 3 3 3 3 3 f f 3 3 3 3 3 . . 
                                        . . 3 3 3 3 3 f f 3 3 3 3 3 . . 
                                        . . 3 3 3 3 3 3 3 3 3 3 3 3 . . 
                                        . . 3 3 3 3 3 3 3 3 3 3 3 3 . . 
                                        . . 2 3 3 3 3 3 3 3 3 3 3 2 . . 
                                        . . . 2 3 3 3 3 3 3 3 3 2 . . . 
                                        . . . . 2 3 3 3 3 3 3 2 . . . . 
                                        . . . . . 2 2 2 2 2 2 . . . . . 
                                        . . . . . . . . . . . . . . . . 
                                        `)
                                } else {
                                    if (CycleLevel == 8) {
                                        mySprite5.setImage(img`
                                            . . . . . . . . . . . . . . . . 
                                            . . . . . . . . . . . . . . . . 
                                            . . . . . 3 3 3 3 3 3 . . . . . 
                                            . . . . 3 3 3 3 3 3 3 3 . . . . 
                                            . . . 3 3 3 3 3 3 3 3 3 3 . . . 
                                            . . 3 3 3 3 3 3 3 3 3 3 3 3 . . 
                                            . . 3 3 3 3 3 3 3 3 3 3 3 3 . . 
                                            . . 3 3 3 3 3 f f 3 3 3 3 3 . . 
                                            . . 3 3 3 3 3 f f 3 3 3 3 3 . . 
                                            . . 3 3 3 3 3 3 3 3 3 3 3 3 . . 
                                            . . 3 3 3 3 3 3 3 3 3 3 3 3 . . 
                                            . . 2 3 3 3 3 3 3 3 3 3 3 2 . . 
                                            . . . 2 3 3 3 3 3 3 3 3 2 . . . 
                                            . . . . 2 3 3 3 3 3 3 2 . . . . 
                                            . . . . . 2 2 2 2 2 2 . . . . . 
                                            . . . . . . . . . . . . . . . . 
                                            `)
                                        extraEffects.createSpreadEffectOnAnchor(mySprite, extraEffects.createSingleColorSpreadEffectData(2, ExtraEffectPresetShape.Spark), 100)
                                    } else {
                                        CycleLevel = 8
                                        extraEffects.createSpreadEffectOnAnchor(mySprite, extraEffects.createSingleColorSpreadEffectData(2, ExtraEffectPresetShape.Spark), 100)
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        pause(100)
        AddCycle()
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile88`, function (sprite, location) {
    if (controller.A.isPressed()) {
        timer.after(1, function () {
            controller.moveSprite(mySprite, 0, 0)
            tiles.setTileAt(location, assets.tile`transparency8`)
            music.stopAllSounds()
            music.play(music.createSong(hex`0078000408020109010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c8000a0000000100050405060708`), music.PlaybackMode.InBackground)
            scene.cameraShake(4, 500)
            color.startFadeFromCurrent(color.White, 1000)
            pause(5000)
            controller.moveSprite(mySprite, 70, 0)
            sprites.destroyAllSpritesOfKind(SpriteKind.Text)
            color.startFadeFromCurrent(color.originalPalette, 1000)
            PlayingLevel = 13
            tiles.setCurrentTilemap(tileUtil.createSmallMap(tilemap`level23`))
            tiles.placeOnTile(mySprite, tiles.getTileLocation(1, 13))
            textSprite2 = textsprite.create("Just stop going back and forth, and shut it already.", 1, 15)
            tiles.placeOnTile(textSprite2, tiles.getTileLocation(21, 7))
            profilelife.setFilledLifeImage(img`
                . . . . . . . . 
                . e e . . f f . 
                e 5 5 e f 4 4 f 
                e 5 5 5 4 4 4 f 
                e 5 5 5 4 4 4 f 
                . e 5 5 4 4 f . 
                . . e 5 4 f . . 
                . . . e f . . . 
                `)
            profilelife.setEmptyLifeImage(img`
                . . . . . . . . 
                . e e . . f f . 
                e d d e f e e f 
                e d d d e e e f 
                e d d d e e e f 
                . e d d e e f . 
                . . e d e f . . 
                . . . e f . . . 
                `)
            profilelife.setMaxLife(3)
            info.setLife(3)
            Simulate_Spikes()
            music.play(music.createSong(hex`006e000408080400001c00010a006400f40164000004000000000000000000000000000500000460000000060001190600080001a12000260001192600280001a14000460001194600480001a16000660001196600680001a18000860001198600880001a1a000a6000119a600a80001a1c000c6000119c600c80001a1e000e6000119e600e80001a105001c000f0a006400f4010a00000400000000000000000000000000000000020e0100000400010d06000a00010d0c001000010d12001600010d18001c00010d1e002200010d24002800010d2a002e00010d30003400010d36003a00010d3c003e00010d40004400010d46004a00010d4c005000010d52005600010d58005c00010d5e006200010d64006800010d6a006e00010d70007400010d76007a00010d7c007e00010d80008400018e86008a00018e8c009000018e92009600018e98009c00018e9e00a000018ea000a4000190a600aa000190ac00b0000190b200b6000190b800bc000190bc00c000018ec000c400010dc600ca00010dcc00d000010dd200d600010dd800dc00010dde00e200010de400e800010dea00ee00010df000f400010df600fa00010dfc00fe00010d07001c00020a006400f401640000040000000000000000000000000000000003900008000a00011910001200011918001a00019a28002a00011930003200011938003a00019c48004a00011950005200011958005a00019a68006a00011970007200011978007a00019c88008a00019a90009200019a98009a00019aa800aa00019cb000b200019cb800ba00019ec800ca000119d000d2000119d800da00019ae800ea000119f000f2000119f800fa00019c09010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c80029010000010001040200030001041000110001041600170001041c001d0001042000210001042400250001042a002b0001042c002d0001042e002f0001043000310001043e003f0001044000410001044200430001045000510001045200530001045800590001045e005f000104680069000104700071000104760077000104780079000104800081000104880089000204068e008f0001049000910001049800990001069c009d00020406a000a1000104a800a900020406b000b1000104bc00bd00020406c000c100020406c800c900020406ca00cb000104d600d7000104d800d9000106da00db000104dc00dd000106de00df000104e600e7000104e800e900020406ea00eb000104f200f3000104f400f5000104f600f7000104f800f900020406fc00fd00020406`), music.PlaybackMode.LoopingInBackground)
        })
    } else {
        mySprite.sayText("A", 50, false)
    }
})
function Phased () {
    for (let value of tiles.getTilesByType(assets.tile`myTile83`)) {
        tiles.setWallAt(value, true)
        tiles.setTileAt(value, assets.tile`myTile101`)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile85`)) {
        tiles.setWallAt(value, true)
        tiles.setTileAt(value, assets.tile`myTile83`)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile101`)) {
        tiles.setWallAt(value, false)
        tiles.setTileAt(value, assets.tile`myTile85`)
    }
    characterAnimations.loopFrames(
    mySprite,
    [img`
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        e . . . f . b . 
        d . . . e d 9 . 
        . b 9 d 1 b 1 . 
        . . e b 9 e b . 
        . . d . d . e . 
        `,img`
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        a . . . a . c . 
        e . . . c e d . 
        . c f d 1 a 1 . 
        . . a e f d c . 
        . . d . c . e . 
        `,img`
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        d . . . b . d . 
        9 . . . e 9 b . 
        . f b d 1 e 1 . 
        . . e 9 e d f . 
        . . b . d . 9 . 
        `],
    200,
    characterAnimations.rule(Predicate.NotMoving)
    )
    characterAnimations.loopFrames(
    mySprite,
    [img`
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        . b . b . . . e 
        . f d f . . . d 
        . 1 9 1 e f d . 
        . e b 9 d b . . 
        d . e . . . d . 
        `,img`
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        . a . f . . . b 
        . f e b . . . e 
        . 1 d 1 d a d . 
        . b a b e f . . 
        e . d . . . a . 
        `,img`
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        . 9 . c . . . c 
        . e a f . . . e 
        . 1 c 1 f c e . 
        . 9 e a e a . . 
        e . a . . . c . 
        `],
    200,
    characterAnimations.rule(Predicate.MovingUp, Predicate.FacingLeft)
    )
    characterAnimations.loopFrames(
    mySprite,
    [img`
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . e . 
        . c . f . . c . 
        . f a e . . e . 
        . 1 c 1 a c . . 
        . a e b e a . . 
        e . a . c . . . 
        `,img`
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . c . 
        . c . a . . a . 
        . a e c . . c . 
        . 1 f 1 c e . . 
        . e c a e f . . 
        c . e . c . . . 
        `,img`
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . a . 
        . c . e . . f . 
        . a 9 c . . e . 
        . 1 e 1 e f . . 
        . f c a f c . . 
        e . a . e . . . 
        `],
    200,
    characterAnimations.rule(Predicate.MovingDown, Predicate.FacingLeft)
    )
    characterAnimations.loopFrames(
    mySprite,
    [img`
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        e . . . b . b . 
        d . . . f d f . 
        . d f e 1 9 1 . 
        . . b d 9 b e . 
        . d . . . e . d 
        `,img`
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        b . . . f . a . 
        e . . . b e f . 
        . d a d 1 d 1 . 
        . . f e b a b . 
        . a . . . d . e 
        `,img`
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        c . . . c . 9 . 
        e . . . f a e . 
        . e c f 1 c 1 . 
        . . a e a e 9 . 
        . c . . . a . e 
        `],
    200,
    characterAnimations.rule(Predicate.MovingUp, Predicate.FacingRight)
    )
    characterAnimations.loopFrames(
    mySprite,
    [img`
        . . . . . . . . 
        . . . . . . . . 
        . e . . . . . . 
        . c . . f . c . 
        . e . . e a f . 
        . . c a 1 c 1 . 
        . . a e b e a . 
        . . . c . a . e 
        `,img`
        . . . . . . . . 
        . . . . . . . . 
        . c . . . . . . 
        . a . . a . c . 
        . c . . c e a . 
        . . e c 1 f 1 . 
        . . f e a c e . 
        . . . c . e . c 
        `,img`
        . . . . . . . . 
        . . . . . . . . 
        . a . . . . . . 
        . f . . e . c . 
        . e . . c 9 a . 
        . . f e 1 e 1 . 
        . . c f a c f . 
        . . . e . a . e 
        `],
    200,
    characterAnimations.rule(Predicate.MovingDown, Predicate.FacingRight)
    )
    characterAnimations.loopFrames(
    mySprite,
    [img`
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        e . . . f . f . 
        c . . . a e c . 
        . e 9 c 1 f 1 . 
        . . c a e 9 a . 
        . e . . . c . e 
        `,img`
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        e . . . f . e . 
        9 . . . e 9 f . 
        . c e c 1 c 1 . 
        . . f 9 c f 9 . 
        `],
    200,
    characterAnimations.rule(Predicate.MovingRight)
    )
    characterAnimations.loopFrames(
    mySprite,
    [img`
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        . f . f . . . e 
        . c e a . . . c 
        . 1 f 1 c 9 e . 
        . a 9 e a c . . 
        e . c . . . e . 
        `,img`
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        . e . f . . . e 
        . f 9 e . . . 9 
        . 1 c 1 c e c . 
        . 9 f c 9 f . . 
        `],
    200,
    characterAnimations.rule(Predicate.MovingLeft)
    )
    if (PlayingLevel == 15) {
        mySprite3.setImage(img`
            .....fffffffffff.....
            ....fffffffffffff....
            ...fffffffffffffff...
            ..fffffffb1bfffffff..
            .ffffffa1fffabffffff.
            fffffdb1fffff1bdfffff
            f5ffeb11fffff11beffff
            f5ff4db1fffff1bd4ff5f
            f5fff44bafff1a44fff5f
            f45ff4f44b1b44f4fff5f
            f45ffff4f4444fffff54f
            f445ffffff4fffffff54f
            ff45ffffffff5ffff544f
            ff445fff5ff545fff54ff
            ff4f45f545544f5f54fff
            ffff4f5f444f4ff5f4f4f
            ffffffff4f4ffffffffff
            fff.f.fff.ff4ffff.fff
            ff.....f...fff.f...ff
            f...........f.......f
            `)
        mySprite3.setVelocity(-65, 0)
        animation.runImageAnimation(
        mySprite3,
        [img`
            .....fffffffffff.....
            ....fffffffffffff....
            ...fffffffffffffff...
            ..fffffffb1bfffffff..
            .ffffffa1fffabffffff.
            fffffdb1fffff1bdfffff
            f5ffeb11fffff11beffff
            f5ff4db1fffff1bd4ff5f
            f5fff44bafff1a44fff5f
            f45ff4f44b1b44f4fff5f
            f45ffff4f4444fffff54f
            f445ffffff4fffffff54f
            ff45ffffffff5ffff544f
            ff445fff5ff545fff54ff
            ff4f45f545544f5f54fff
            ffff4f5f444f4ff5f4f4f
            ffffffff4f4ffffffffff
            fff.f.fff.ff4ffff.fff
            ff.....f...fff.f...ff
            f...........f.......f
            `,img`
            .....fffffffffff.....
            ....fffffffffffff....
            ...fffffffffffffff...
            ..fffffffb1bfffffff..
            .ffffffafff1abffffff.
            fffffdbfffff11bdfffff
            f5ffeb1fffff111beffff
            f5ff4dbfffff11bd4ff5f
            f5fff44bfff11a44fff5f
            f45ff4f44b1b44f4fff5f
            f45ffff4f4444fffff54f
            f445ffffff4fffffff54f
            ff45ffffffff5ffff544f
            ff445fff5ff545fff54ff
            ff4f45f545544f5f54fff
            ffff4f5f444f4ff5f4f4f
            ffffffff4f4ffffffffff
            fff.f.fff.ff4ffff.fff
            ff.....f...fff.f...ff
            f...........f.......f
            `,img`
            .....fffffffffff.....
            ....fffffffffffff....
            ...fffffffffffffff...
            ..fffffffbfffffffff..
            .ffffffa1fffffffffff.
            fffffdb11fffffbdfffff
            f5ffeb111fffff1beffff
            f5ff4db111fff1bd4ff5f
            f5fff44ba1111a44fff5f
            f45ff4f44b1b44f4fff5f
            f45ffff4f4444fffff54f
            f445ffffff4fffffff54f
            ff45ffffffff5ffff544f
            ff445fff5ff545fff54ff
            ff4f45f545544f5f54fff
            ffff4f5f444f4ff5f4f4f
            ffffffff4f4ffffffffff
            fff.f.fff.ff4ffff.fff
            ff.....f...fff.f...ff
            f...........f.......f
            `,img`
            .....fffffffffff.....
            ....fffffffffffff....
            ...fffffffffffffff...
            ..fffffffb1bfffffff..
            .ffffffa1111abffffff.
            fffffdb111fff1bdfffff
            f5ffeb111fffff1beffff
            f5ff4db11fffffbd4ff5f
            f5fff44bafffff44fff5f
            f45ff4f44bff44f4fff5f
            f45ffff4f4444fffff54f
            f445ffffff4fffffff54f
            ff45ffffffff5ffff544f
            ff445fff5ff545fff54ff
            ff4f45f545544f5f54fff
            ffff4f5f444f4ff5f4f4f
            ffffffff4f4ffffffffff
            fff.f.fff.ff4ffff.fff
            ff.....f...fff.f...ff
            f...........f.......f
            `,img`
            .....fffffffffff.....
            ....fffffffffffff....
            ...fffffffffffffff...
            ..fffffffb1bfffffff..
            .ffffffa1111abffffff.
            fffffdb1fff111bdfffff
            f5ffeb1fffff111beffff
            f5ff4dbfffff11bd4ff5f
            f5fff44fffff1a44fff5f
            f45ff4f44ffb44f4fff5f
            f45ffff4f4444fffff54f
            f445ffffff4fffffff54f
            ff45ffffffff5ffff544f
            ff445fff5ff545fff54ff
            ff4f45f545544f5f54fff
            ffff4f5f444f4ff5f4f4f
            ffffffff4f4ffffffffff
            fff.f.fff.ff4ffff.fff
            ff.....f...fff.f...ff
            f...........f.......f
            `],
        50,
        true
        )
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile30`, function (sprite, location) {
    if (controller.A.isPressed()) {
        timer.after(1, function () {
            controller.moveSprite(mySprite, 0, 0)
            tiles.setTileAt(location, assets.tile`transparency8`)
            music.stopAllSounds()
            music.play(music.createSong(hex`0078000408020109010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c8000a0000000100050405060708`), music.PlaybackMode.InBackground)
            scene.cameraShake(4, 500)
            color.startFadeFromCurrent(color.White, 1000)
            pause(5000)
            controller.moveSprite(mySprite, 70, 0)
            sprites.destroyAllSpritesOfKind(SpriteKind.Text)
            color.startFadeFromCurrent(color.originalPalette, 1000)
            PlayingLevel = 6
            tiles.setCurrentTilemap(tileUtil.createSmallMap(tilemap`level16`))
            tiles.placeOnTile(mySprite, tiles.getTileLocation(1, 13))
            textSprite2 = textsprite.create("Some people deserve it more than you, cat.", 1, 15)
            tiles.placeOnTile(textSprite2, tiles.getTileLocation(17, 7))
            profilelife.setFilledLifeImage(img`
                . . . . . . . . 
                . e e . . f f . 
                e 5 5 e f 4 4 f 
                e 5 5 5 4 4 4 f 
                e 5 5 5 4 4 4 f 
                . e 5 5 4 4 f . 
                . . e 5 4 f . . 
                . . . e f . . . 
                `)
            profilelife.setEmptyLifeImage(img`
                . . . . . . . . 
                . e e . . f f . 
                e d d e f e e f 
                e d d d e e e f 
                e d d d e e e f 
                . e d d e e f . 
                . . e d e f . . 
                . . . e f . . . 
                `)
            profilelife.setMaxLife(3)
            info.setLife(3)
            Simulate_Spikes()
            music.play(music.createSong(hex`005a000408080400001c00010a006400f401640000040000000000000000000000000005000004000300000200011802000400019a04000600011b06000800019f08000a0001240a000c0001180c000e00019a0e001000011b10001200019f12001400012414001600011816001800019a18001a00011b1a001c00019f1c001e0001241e002000011b20002200011d22002400019f24002600012226002800012728002a00011b2a002c00011d2c002e00019f2e003000012230003200012732003400019a34003600011b36003800019f38003a0001243a003c00019f3c003e00011b3e004000019740004200011842004400019a44004600011b46004800019f48004a0001244a004c0001184c004e00019a4e005000011b50005200019f52005400012454005600011856005800019a58005a00011b5a005c00019f5c005e0001245e006000011b60006200011d62006400019f64006600012266006800012768006a00011b6a006c00011d6c006e00019f6e007000012270007200012772007400019a74007600011b76007800019f78007a0001247a007c00019f7c007e00011b7e008000019780008200011882008400019a84008600011b86008800019f88008a0001248a008c0001188c008e00019a8e009000011b90009200019f92009400012494009600011896009800019a98009a00011b9a009c00019f9c009e0001249e00a000011ba000a200011da200a400019fa400a6000122a600a8000127a800aa00011baa00ac00011dac00ae00019fae00b0000122b000b2000127b200b400019ab400b600011bb600b800019fb800ba000124ba00bc00019fbc00be00011bbe00c0000197c000c2000118c200c400019ac400c600011bc600c800019fc800ca000124ca00cc000118cc00ce00019ace00d000011bd000d200019fd200d4000124d400d6000118d600d800019ad800da00011bda00dc00019fdc00de000124de00e000011be000e200011de200e400019fe400e6000122e600e8000127e800ea00011bea00ec00011dec00ee00019fee00f0000122f000f2000127f200f400019af400f600011bf600f800019ff800fa000124fa00fc00019ffc00fe00011bfe000001019703001c0001dc00690000045e01000400000000000000000000056400010400031e008000a0000118a000c000011bc000e0000118e000f000011df0000001019f07001c00020a006400f401640000040000000000000000000000000000000003a20000000400011806000800011820002400011b26002800011b40004400011846004800011860006400011b66006800011b70007400011d76007800011d78007c00019f800084000118860088000118a000a400011ba600a800011bb000b4000118b600b8000118b800bc000197be00c0000197c000c4000118c600c8000118e000e400011be600e800011bf000f400011df600f800011df800fc00019ffe00000101a309010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c80011010000010001030e000f0001031000110001031400150001032800290001032a002b0001033800390001033e003f0001034000410001034e004f0001035000510001035400550001036600670001036800690001036a006b0001036c006d0001037200730001037800790001037e007f0001038000810001038800890001068e008f000103900091000103940095000103980099000106a800a900020306aa00ab000103b800b900020306be00bf000103c000c1000103c600c7000103c800c900020306cc00cd000103d800d900020306e000e100020306e600e7000103e800e900020306ee00ef000103f000f1000106f400f500020306f800f9000106fa00fb00020306fc00fd000106fe00ff00020306`), music.PlaybackMode.LoopingInBackground)
        })
    } else {
        mySprite.sayText("A", 50, false)
    }
})
function Simulate_Spikes () {
    for (let value of tiles.getTilesByType(assets.tile`myTile64`)) {
        mySprite2 = sprites.create(img`
            . . . 5 5 . . . 
            . . 5 4 4 5 . . 
            . 5 4 f f 4 5 . 
            5 4 f f f f 4 5 
            5 4 f f f f 4 5 
            . 5 4 f f 4 5 . 
            . 5 4 4 4 4 5 . 
            . . 5 5 5 5 . . 
            `, SpriteKind.Spout)
        tiles.placeOnTile(mySprite2, value)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile74`)) {
        mySprite2 = sprites.create(img`
            . . . 7 7 . . . 
            . . 7 6 6 7 . . 
            . 7 6 f f 6 7 . 
            7 6 f f f f 6 7 
            7 6 f f f f 6 7 
            . 7 6 f f 6 7 . 
            . 7 6 6 6 6 7 . 
            . . 7 7 7 7 . . 
            `, SpriteKind.Blurt)
        tiles.placeOnTile(mySprite2, value)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile47`)) {
        mySprite2 = sprites.create(img`
            . . . 5 5 . . . 
            . . 5 4 4 5 . . 
            . 5 4 f f 4 5 . 
            5 4 f f f f 4 5 
            5 4 f f f f 4 5 
            . 5 4 f f 4 5 . 
            . . 5 4 4 5 . . 
            . . . 5 5 . . . 
            `, SpriteKind.Saw)
        tiles.placeOnTile(mySprite2, value)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile109`)) {
        mySprite2 = sprites.create(img`
            . . . . . . . . 
            . . . . . . . . 
            . 5 5 d d 5 5 . 
            5 4 4 f e 4 4 5 
            5 4 4 e f 4 4 5 
            . 5 5 d d 5 5 . 
            . . . . . . . . 
            . . . . . . . . 
            `, SpriteKind.Hover)
        mySprite2.setBounceOnWall(true)
        mySprite2.setVelocity(0, 40)
        tiles.placeOnTile(mySprite2, value)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile73`)) {
        mySprite2 = sprites.create(img`
            . . . . . . . . 
            . . . . . . . . 
            . . . 7 7 . . . 
            . . 7 6 6 7 . . 
            . . 7 6 6 7 . . 
            . . . 7 7 . . . 
            . . . . . . . . 
            . . . . . . . . 
            `, SpriteKind.BuzzSaw)
        tiles.placeOnTile(mySprite2, value)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile35`)) {
        mySprite2 = sprites.create(img`
            . . . . . . . . 
            . . . 5 5 . . . 
            . . . 5 5 . . . 
            . . 5 4 4 5 . . 
            . . 5 4 4 5 . . 
            . 5 4 f f 4 5 . 
            . 5 4 f f 4 5 . 
            5 4 f f f f 4 5 
            `, SpriteKind.Spike)
        tiles.placeOnTile(mySprite2, value)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile71`)) {
        mySprite2 = sprites.create(img`
            . . . . . . . . 
            . . . 7 7 . . . 
            . . . 7 7 . . . 
            . . 7 6 6 7 . . 
            . . 7 6 6 7 . . 
            . 7 6 f f 6 7 . 
            . 7 6 f f 6 7 . 
            7 6 f f f f 6 7 
            `, SpriteKind.Cacti)
        tiles.placeOnTile(mySprite2, value)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile40`)) {
        mySprite2 = sprites.create(img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . 5 5 . . . 
            . . . 5 5 . . . 
            . . 5 4 4 5 . . 
            `, SpriteKind.Setup)
        tiles.placeOnTile(mySprite2, value)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile72`)) {
        mySprite2 = sprites.create(img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . 7 7 . . . 
            . . . 7 7 . . . 
            . . 7 6 6 7 . . 
            `, SpriteKind.Scorchup)
        tiles.placeOnTile(mySprite2, value)
    }
    if (Phase == 2) {
        Skin2()
        Phase = 1
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile26`, function (sprite, location) {
    if (controller.A.isPressed()) {
        timer.after(1, function () {
            tiles.setTileAt(location, assets.tile`transparency8`)
            controller.moveSprite(mySprite, 0, 0)
            music.stopAllSounds()
            music.play(music.createSong(hex`0078000408020109010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c8000a0000000100050405060708`), music.PlaybackMode.InBackground)
            scene.cameraShake(4, 500)
            color.startFadeFromCurrent(color.White, 1000)
            pause(5000)
            controller.moveSprite(mySprite, 70, 0)
            sprites.destroyAllSpritesOfKind(SpriteKind.Text)
            color.startFadeFromCurrent(color.originalPalette, 1000)
            PlayingLevel = 2
            tiles.setCurrentTilemap(tileUtil.createSmallMap(tilemap`level10`))
            tiles.placeOnTile(mySprite, tiles.getTileLocation(1, 13))
            textSprite2 = textsprite.create("Why keep going if your goal is unachievable?", 1, 15)
            tiles.placeOnTile(textSprite2, tiles.getTileLocation(18, 7))
            profilelife.setFilledLifeImage(img`
                . . . . . . . . 
                . e e . . f f . 
                e 5 5 e f 4 4 f 
                e 5 5 5 4 4 4 f 
                e 5 5 5 4 4 4 f 
                . e 5 5 4 4 f . 
                . . e 5 4 f . . 
                . . . e f . . . 
                `)
            profilelife.setEmptyLifeImage(img`
                . . . . . . . . 
                . e e . . f f . 
                e d d e f e e f 
                e d d d e e e f 
                e d d d e e e f 
                . e d d e e f . 
                . . e d e f . . 
                . . . e f . . . 
                `)
            profilelife.setMaxLife(3)
            info.setLife(3)
            Simulate_Spikes()
            music.play(music.createSong(hex`005a0004080c0300001c00010a006400f401640000040000000000000000000000000005000004360200000400011804000800021b9f08000c0001180c001000021b9f10001400011814001800021b9f18001c00011b1c002000021b9f20002400011d24002800021d2028002c00011d2c003000021d2030003400011d34003800021d2038003c00011d3c004000021d2040004400011d44004800021d2248004c00011d4c005000021d2250005400011b54005800021d2258005c00019a5c006000021d2260006400011864006800029f2468006c0001186c007000029f2470007400011874007800029f2478007c0001187c008000029f2480008400011884008800021b9f88008c0001188c009000021b9f90009400011894009800021b9f98009c00011b9c00a000021b9fa000a400011da400a800021d20a800ac00011dac00b000021d20b000b400011db400b800021d20b800bc00011dbc00c000021d20c000c400011dc400c800021d22c800cc00011dcc00d000021d22d000d400011bd400d800021d22d800dc00019adc00e000021d22e000e4000118e400e800029f24e800ec000118ec00f000029f24f000f4000118f400f800029f24f800fc000118fc000001029f2400010401011804010801019f08010c01011b10011401011814011801019f18011c01011b20012401011824012801019f28012c01011b30013401011d34013801012038013c01011d40014401011d44014801012048014c01011d50015401011d54015801012058015c01011d60016401011d64016801012068016c01012270017401012274017801012078017c0101227c018001012407001c00020a006400f401640000040000000000000000000000000000000003d80008000c00012410001400012718001c0001ab20002400012948004c00012450005400012758005c0001a660006400012488008c00012490009400012798009c0001aba000a4000129c800cc000129d000d4000127d800dc0001a6e000e400012408010c01012410011401012718011c0101ab20012401012928012c01012430013401012738013c0101ab3c014001012c40014401012948014c0101244e015001012450015401012758015c0101a660016401012468016c0101226c01700101247001740101a674017801012478017c0101227c018001012409010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c8003a010000010001031000110001061200130001061c001d0001052000210001033000310001063200330001063c003d00020305400041000103500051000103580059000203065a005b000106600061000103700071000106720073000106760077000106780079000106800081000103900091000106920093000106a000a1000103b000b1000106b200b3000106bc00bd00020305c000c1000103d000d100020306d200d3000106d800d9000103e000e1000103f000f1000106f200f3000106f600f7000106f800f900010600010101010308010901020306100111010303040718011901020306200121010103280129010203063001310103030407380139010203064001410101034801490102030650015101030304075801590102030660016101010368016901020306700171010303040778017901020306`), music.PlaybackMode.LoopingInBackground)
        })
    } else {
        mySprite.sayText("A", 50, false)
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile28`, function (sprite, location) {
    if (controller.A.isPressed()) {
        timer.after(1, function () {
            controller.moveSprite(mySprite, 0, 0)
            tiles.setTileAt(location, assets.tile`transparency8`)
            music.stopAllSounds()
            music.play(music.createSong(hex`0078000408020109010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c8000a0000000100050405060708`), music.PlaybackMode.InBackground)
            scene.cameraShake(4, 500)
            color.startFadeFromCurrent(color.White, 1000)
            pause(5000)
            controller.moveSprite(mySprite, 70, 0)
            sprites.destroyAllSpritesOfKind(SpriteKind.Text)
            color.startFadeFromCurrent(color.originalPalette, 1000)
            PlayingLevel = 4
            tiles.setCurrentTilemap(tileUtil.createSmallMap(tilemap`level13`))
            tiles.placeOnTile(mySprite, tiles.getTileLocation(1, 13))
            textSprite2 = textsprite.create("Face me and prove it is worth the journey.", 1, 15)
            tiles.placeOnTile(textSprite2, tiles.getTileLocation(17, 7))
            profilelife.setFilledLifeImage(img`
                . . . . . . . . 
                . e e . . f f . 
                e 5 5 e f 4 4 f 
                e 5 5 5 4 4 4 f 
                e 5 5 5 4 4 4 f 
                . e 5 5 4 4 f . 
                . . e 5 4 f . . 
                . . . e f . . . 
                `)
            profilelife.setEmptyLifeImage(img`
                . . . . . . . . 
                . e e . . f f . 
                e d d e f e e f 
                e d d d e e e f 
                e d d d e e e f 
                . e d d e e f . 
                . . e d e f . . 
                . . . e f . . . 
                `)
            profilelife.setMaxLife(3)
            info.setLife(3)
            Simulate_Spikes()
            music.play(music.createSong(hex`005a0004080c0300001c00010a006400f401640000040000000000000000000000000005000004360200000400011804000800021b9f08000c0001180c001000021b9f10001400011814001800021b9f18001c00011b1c002000021b9f20002400011d24002800021d2028002c00011d2c003000021d2030003400011d34003800021d2038003c00011d3c004000021d2040004400011d44004800021d2248004c00011d4c005000021d2250005400011b54005800021d2258005c00019a5c006000021d2260006400011864006800029f2468006c0001186c007000029f2470007400011874007800029f2478007c0001187c008000029f2480008400011884008800021b9f88008c0001188c009000021b9f90009400011894009800021b9f98009c00011b9c00a000021b9fa000a400011da400a800021d20a800ac00011dac00b000021d20b000b400011db400b800021d20b800bc00011dbc00c000021d20c000c400011dc400c800021d22c800cc00011dcc00d000021d22d000d400011bd400d800021d22d800dc00019adc00e000021d22e000e4000118e400e800029f24e800ec000118ec00f000029f24f000f4000118f400f800029f24f800fc000118fc000001029f2400010401011804010801019f08010c01011b10011401011814011801019f18011c01011b20012401011824012801019f28012c01011b30013401011d34013801012038013c01011d40014401011d44014801012048014c01011d50015401011d54015801012058015c01011d60016401011d64016801012068016c01012270017401012274017801012078017c0101227c018001012407001c00020a006400f401640000040000000000000000000000000000000003d80008000c00012410001400012718001c0001ab20002400012948004c00012450005400012758005c0001a660006400012488008c00012490009400012798009c0001aba000a4000129c800cc000129d000d4000127d800dc0001a6e000e400012408010c01012410011401012718011c0101ab20012401012928012c01012430013401012738013c0101ab3c014001012c40014401012948014c0101244e015001012450015401012758015c0101a660016401012468016c0101226c01700101247001740101a674017801012478017c0101227c018001012409010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c8003a010000010001031000110001061200130001061c001d0001052000210001033000310001063200330001063c003d00020305400041000103500051000103580059000203065a005b000106600061000103700071000106720073000106760077000106780079000106800081000103900091000106920093000106a000a1000103b000b1000106b200b3000106bc00bd00020305c000c1000103d000d100020306d200d3000106d800d9000103e000e1000103f000f1000106f200f3000106f600f7000106f800f900010600010101010308010901020306100111010303040718011901020306200121010103280129010203063001310103030407380139010203064001410101034801490102030650015101030304075801590102030660016101010368016901020306700171010303040778017901020306`), music.PlaybackMode.LoopingInBackground)
        })
    } else {
        mySprite.sayText("A", 50, false)
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile70`, function (sprite, location) {
    if (info.life() < 3) {
        tiles.setTileAt(location, assets.tile`myTile43`)
        extraEffects.createSpreadEffectOnAnchor(mySprite, extraEffects.createSingleColorSpreadEffectData(7, ExtraEffectPresetShape.Spark), 100)
        info.changeLifeBy(2)
        music.play(music.createSoundEffect(
        WaveShape.Triangle,
        1,
        1726,
        400,
        250,
        500,
        SoundExpressionEffect.Warble,
        InterpolationCurve.Curve
        ), music.PlaybackMode.InBackground)
    }
})
let Shooter = 0
let mySprite2: Sprite = null
let Level15Done = 0
let textSprite: TextSprite = null
let Level9Done = 0
let Level11Done = 0
let Level12Done = 0
let Level13Done = 0
let Level14Done = 0
let Level8Done = 0
let Level7Done = 0
let Level6Done = 0
let Level4Done = 0
let Level3Done = 0
let Level2Done = 0
let Level1Done = 0
let CycleLevel = 0
let mySprite4: Sprite = null
let LevelsDone = 0
let textSprite2: TextSprite = null
let Skin = 0
let myMenu: miniMenu.MenuSprite = null
let Perfects = 0
let mySprite3: Sprite = null
let PlayingLevel = 0
let GameStart = 0
let ExtraJump = 0
let mySprite: Sprite = null
let mySprite5: Sprite = null
let Phase = 0
let Orb = 0
let Level5Done = 0
let Level10Done = 0
Level10Done = 2
Level5Done = 2
Orb = 1
Phase = 1
music.stopAllSounds()
mySprite5 = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . d d d d d d . . . . . 
    . . . . d d d d d d d d . . . . 
    . . . d d d d d d d d d d . . . 
    . . d d d d d d d d d d d d . . 
    . . d d d d d d d d d d d d . . 
    . . d d d d d f f d d d d d . . 
    . . d d d d d f f d d d d d . . 
    . . d d d d d d d d d d d d . . 
    . . d d d d d d d d d d d d . . 
    . . e d d d d d d d d d d e . . 
    . . . e d d d d d d d d e . . . 
    . . . . e d d d d d d e . . . . 
    . . . . . e e e e e e . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Cycle)
mySprite5.setFlag(SpriteFlag.RelativeToCamera, true)
mySprite5.setPosition(153, 7)
Menu()
game.onUpdateInterval(1000, function () {
    Shooter = 0
    for (let value of tiles.getTilesByType(assets.tile`myTile64`)) {
        Shooter = 1
        mySprite2 = sprites.create(img`
            . . . 5 5 . . . 
            . . . 5 5 . . . 
            . . 5 4 4 5 . . 
            . . 5 4 4 5 . . 
            . 5 4 f f 4 5 . 
            . . . f f . . . 
            . . . f f . . . 
            . . . . . . . . 
            `, SpriteKind.Shot)
        extraEffects.createSpreadEffectOnAnchor(mySprite2, extraEffects.createSingleColorSpreadEffectData(5, ExtraEffectPresetShape.Spark), 100, 12, 10)
        mySprite2.setVelocity(0, -100)
        tiles.placeOnTile(mySprite2, value)
    }
    if (Shooter == 1) {
        music.play(music.createSoundEffect(
        WaveShape.Sawtooth,
        1,
        2663,
        400,
        400,
        80,
        SoundExpressionEffect.Warble,
        InterpolationCurve.Linear
        ), music.PlaybackMode.InBackground)
    }
})
game.onUpdateInterval(1000, function () {
    Shooter = 0
    for (let value of tiles.getTilesByType(assets.tile`myTile74`)) {
        timer.after(randint(500, 1000), function () {
            Shooter = 1
            mySprite2 = sprites.create(img`
                . . . 7 7 . . . 
                . . . 7 7 . . . 
                . . 7 6 6 7 . . 
                . . 7 6 6 7 . . 
                . 7 6 f f 6 7 . 
                . . . f f . . . 
                . . . f f . . . 
                . . . . . . . . 
                `, SpriteKind.Shot)
            extraEffects.createSpreadEffectOnAnchor(mySprite2, extraEffects.createSingleColorSpreadEffectData(7, ExtraEffectPresetShape.Spark), 100, 12, 10)
            mySprite2.setVelocity(0, -70)
            tiles.placeOnTile(mySprite2, value)
            music.play(music.createSoundEffect(
            WaveShape.Sawtooth,
            1,
            2663,
            100,
            100,
            80,
            SoundExpressionEffect.Warble,
            InterpolationCurve.Linear
            ), music.PlaybackMode.InBackground)
        })
    }
})
forever(function () {
    for (let value of sprites.allOfKind(SpriteKind.BuzzSaw)) {
        if (spriteutils.distanceBetween(mySprite, value) < 30) {
            value.setImage(img`
                . . . 7 7 . . . 
                . . 7 6 6 7 . . 
                . 7 6 f f 6 7 . 
                7 6 f f f f 6 7 
                7 6 f f f f 6 7 
                . 7 6 f f 6 7 . 
                . . 7 6 6 7 . . 
                . . . 7 7 . . . 
                `)
        } else {
            value.setImage(img`
                . . . . . . . . 
                . . . . . . . . 
                . . . 7 7 . . . 
                . . 7 6 6 7 . . 
                . . 7 6 6 7 . . 
                . . . 7 7 . . . 
                . . . . . . . . 
                . . . . . . . . 
                `)
        }
    }
    if (PlayingLevel == 10) {
        if (spriteutils.distanceBetween(mySprite, mySprite3) > 90) {
            info.setLife(0)
        }
    }
})
game.onUpdateInterval(100, function () {
    if (PlayingLevel == 10) {
        mySprite3.x = mySprite.x
    }
})
