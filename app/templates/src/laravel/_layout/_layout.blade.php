@include('_parts.site-header')

<div class="flex-center position-ref full-height">
    @yield('content')
</div>

@include('_parts.site-scripts')
@yield('javascript')

</body>
</html>
