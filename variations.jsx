/* Painel de Tweaks — variações de direção visual e cor */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "dir": "editorial",
  "accent": ["#b15bff", "#ff5ca8"],
  "typing": true,
  "glow": 0.5
}/*EDITMODE-END*/;

function PortfolioTweaks() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const root = document.documentElement;

  React.useEffect(() => { root.setAttribute('data-dir', t.dir); }, [t.dir]);
  React.useEffect(() => {
    const [a1, a2] = t.accent;
    root.style.setProperty('--a1', a1);
    root.style.setProperty('--a2', a2);
  }, [t.accent]);
  React.useEffect(() => {
    if (window.__setTyping) window.__setTyping(!!t.typing);
  }, [t.typing]);
  React.useEffect(() => {
    document.querySelectorAll('.bg-fx .glow').forEach((g, i) => {
      g.style.opacity = (i === 0 ? 0.16 : 0.12) * t.glow;
    });
  }, [t.glow]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Direção visual" />
      <TweakRadio
        label="Estilo"
        value={t.dir}
        options={["editorial", "terminal", "bold"]}
        onChange={(v) => setTweak('dir', v)}
      />
      <p style={{ fontSize: 11.5, lineHeight: 1.45, color: 'var(--tw-dim,#888)', margin: '2px 2px 4px' }}>
        editorial = limpo e minimalista · terminal = dev/mono com grid · bold = tipografia grande em gradiente
      </p>

      <TweakSection label="Cor de destaque" />
      <TweakColor
        label="Paleta"
        value={t.accent}
        options={[
          ["#b15bff", "#ff5ca8"],
          ["#9a6bff", "#4d8dff"],
          ["#7b5cff", "#9a6bff"],
          ["#4d8dff", "#39c8d8"],
          ["#6b5bff", "#3ddc97"]
        ]}
        onChange={(v) => setTweak('accent', v)}
      />

      <TweakSection label="Detalhes" />
      <TweakToggle
        label="Efeito de digitação"
        value={t.typing}
        onChange={(v) => setTweak('typing', v)}
      />
      <TweakSlider
        label="Brilho de fundo"
        value={t.glow}
        min={0} max={2} step={0.1}
        onChange={(v) => setTweak('glow', v)}
      />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('tweaks-root')).render(<PortfolioTweaks />);
