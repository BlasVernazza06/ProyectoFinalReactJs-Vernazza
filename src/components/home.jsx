import { Link } from "react-router-dom"
import { ArrowRight, Coffee, Leaf, Award, Star, Truck, Shield } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-stone-950 via-stone-900 to-amber-950/30" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl" />

        {/* Decorative elements */}
        <div className="absolute top-20 right-20 opacity-20">
          <Coffee className="w-32 h-32 text-amber-500 animate-float" />
        </div>
        <div className="absolute bottom-20 left-20 opacity-10">
          <Coffee className="w-24 h-24 text-amber-400 animate-float" style={{ animationDelay: "1s" }} />
        </div>

        <div className="container mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-medium mb-8 animate-fade-in">
            <Star className="w-4 h-4 fill-amber-400" />
            <span>Cafe premium de especialidad</span>
          </div>

          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="text-stone-100 block">Descubre el Arte</span>
            <span className="gradient-text block mt-2">del Buen Cafe</span>
          </h1>

          <p
            className="text-lg md:text-xl text-stone-400 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Seleccion premium de granos de cafe de los mejores origenes del mundo.
            <span className="text-stone-300"> Tostado artesanal</span> para una experiencia unica en cada taza.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <Link
              to="/productos"
              className="inline-flex items-center gap-3 text-black bg-amber-400 font-semibold px-8 py-4 rounded-full text-lg"
            >
              Explorar Catalogo
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/categoria/origen"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-stone-700 text-stone-300 hover:border-amber-500/50 hover:text-amber-400 transition-all duration-300 font-medium"
            >
              Ver Origenes
            </Link>
          </div>

          {/* Stats */}
          <div
            className="flex flex-wrap justify-center gap-8 mt-16 pt-16 border-t border-stone-800/50 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">15+</div>
              <div className="text-stone-500 text-sm mt-1">Variedades</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">8</div>
              <div className="text-stone-500 text-sm mt-1">Paises de Origen</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">100%</div>
              <div className="text-stone-500 text-sm mt-1">Organico</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">2k+</div>
              <div className="text-stone-500 text-sm mt-1">Clientes Felices</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-stone-900/50 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.03)_0%,transparent_70%)]" />
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-100 mb-4">Por que elegirnos</h2>
            <p className="text-stone-400 max-w-xl mx-auto">Comprometidos con la excelencia en cada grano</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group text-center p-8 rounded-3xl bg-stone-800/30 border border-stone-700/50 hover:border-amber-500/30 transition-all duration-500 card-hover">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Coffee className="h-8 w-8 text-amber-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-stone-100">Tostado Fresco</h3>
              <p className="text-stone-400 leading-relaxed">
                Tostamos cada semana para garantizar la maxima frescura y aroma en tu taza
              </p>
            </div>

            <div className="group text-center p-8 rounded-3xl bg-stone-800/30 border border-stone-700/50 hover:border-amber-500/30 transition-all duration-500 card-hover">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Leaf className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-stone-100">100% Organico</h3>
              <p className="text-stone-400 leading-relaxed">
                Granos cultivados sin pesticidas ni quimicos, respetando el medio ambiente
              </p>
            </div>

            <div className="group text-center p-8 rounded-3xl bg-stone-800/30 border border-stone-700/50 hover:border-amber-500/30 transition-all duration-500 card-hover">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Award className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-stone-100">Calidad Premium</h3>
              <p className="text-stone-400 leading-relaxed">
                Seleccionamos solo los mejores granos de cada cosecha mundial
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-stone-950 border-y border-stone-800/50">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-12 md:gap-20">
            <div className="flex items-center gap-3 text-stone-400">
              <Truck className="h-6 w-6 text-amber-500" />
              <span>Envio gratis +$50</span>
            </div>
            <div className="flex items-center gap-3 text-stone-400">
              <Shield className="h-6 w-6 text-amber-500" />
              <span>Garantia de frescura</span>
            </div>
            <div className="flex items-center gap-3 text-stone-400">
              <Star className="h-6 w-6 text-amber-500" />
              <span>Cafe de especialidad</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-stone-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(245,158,11,0.1)_0%,transparent_60%)]" />

        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-stone-100">
            Explora Nuestras <span className="gradient-text">Categorias</span>
          </h2>
          <p className="text-stone-400 mb-12 text-lg max-w-xl mx-auto">
            Desde cafes de origen unico hasta blends especiales creados por nuestros maestros tostadores
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/categoria/origen"
              className="group px-8 py-4 bg-stone-800/50 hover:bg-stone-800 text-stone-100 rounded-2xl border border-stone-700/50 hover:border-amber-500/30 transition-all duration-300 card-hover"
            >
              <span className="block text-lg font-semibold group-hover:text-amber-400 transition-colors">
                Cafes de Origen
              </span>
              <span className="block text-sm text-stone-500 mt-1">Sabores unicos de cada region</span>
            </Link>
            <Link
              to="/categoria/blend"
              className="group px-8 py-4 bg-stone-800/50 hover:bg-stone-800 text-stone-100 rounded-2xl border border-stone-700/50 hover:border-amber-500/30 transition-all duration-300 card-hover"
            >
              <span className="block text-lg font-semibold group-hover:text-amber-400 transition-colors">
                Blends Especiales
              </span>
              <span className="block text-sm text-stone-500 mt-1">Mezclas perfectamente balanceadas</span>
            </Link>
            <Link
              to="/categoria/especial"
              className="group px-8 py-4 bg-stone-800/50 hover:bg-stone-800 text-stone-100 rounded-2xl border border-stone-700/50 hover:border-amber-500/30 transition-all duration-300 card-hover"
            >
              <span className="block text-lg font-semibold group-hover:text-amber-400 transition-colors">
                Edicion Especial
              </span>
              <span className="block text-sm text-stone-500 mt-1">Lotes limitados exclusivos</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer simple */}
      <footer className="py-8 px-4 border-t border-stone-800/50">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 text-stone-500">
            <Coffee className="h-4 w-4" />
            <span>2024 CafeSelect. Hecho con amor por el cafe.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
